module API
  module V1
    class TransferController < ApiController
      skip_before_action :authenticate

      def index
        return render_unauthorized unless (project = Project.find_by(api_token: params[:token]))
        locale_codes = params[:locale_codes].split(',')

        output = locale_codes.each_with_object({}) do |code, out|
          if (locale = project.locales.where(code: code).first)
            out[locale] = {
              translations: dump_translations(locale.translations.include_dependencies),
              locations: dump_locations(project, locale),
              releases: dump_releases(locale)
            }
          else
            render status: 404, json: { error: "Locale #{code} not found" } and return
          end
        end

        render json: output
      end

      private

      def dump_translations(translations)
        translations.each_with_object({}) do |translation, out|
          out[translation.key] = translation.text
        end
      end

      def dump_locations(project, locale)
        project.locations.each_with_object({}) do |location, out|
          out[location.path] = location.images.map do |image|
            {
              name: image.name,
              variant: image.variant,
              image: image.image,
              highlights: image.highlights.where(locale: locale).map { |highlight| dump_highlight(highlight) }.select(&:present?)
            }
          end
        end
      end

      def dump_highlight(highlight)
        {
          x: highlight.x,
          y: highlight.y,
          width: highlight.width,
          height: highlight.height,
          key: highlight.key.key,
        }
      rescue StandardError => e
        Rails.logger.error "Unable to dump highlight: #{e.message}"
        nil
      end

      def dump_releases(locale)
        locale.releases.each_with_object({}) do |release, out|
          out[release.version] = {
            created_at: release.created_at.to_s,
            yaml: release.yaml
          }
        end
      end
    end
  end
end
