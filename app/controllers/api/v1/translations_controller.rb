module API
  module V1
    class TranslationsController < ApiController

      def index_head
        stale? etag: index_etag
        head :ok
      end

      def index
        return unless stale? etag: index_etag

        if translation_cache = TranslationCache.find_cache(kind: params[:format], etag: index_etag)
          response.headers['CustomCache'] = index_etag.to_json
          render status: 200, text: translation_cache.cache
        else
          @output = Translation.dump_hash Translation.include_dependencies

          TranslationCache.cache(kind: params[:format], etag: index_etag, cache: dump_cache(@output))

          respond_with @output
        end
      end

      def create
        locale = Locale.where(code: params[:locale]).first_or_create
        errors = []
        success = 0

        if params[:location]
          location      = Location.where(path: params[:location]).first_or_create
          default_image = Image.where(location: location, name: location.path).first_or_create
        end

        params[:translations].each do |data|
          key = Key.where(key: data[:key].split('.', 2).last)
                   .first_or_initialize(data_type: data[:data_type])
          if key.valid? && key.save
            unless Translation.where(locale: locale, key: key).first
              Translation.create translation_params(data).merge(locale: locale, key: key)
            end

            success += 1

            if default_image
              Highlight.where(
                image:  default_image,
                key:    key,
                locale: locale
              ).first_or_create
            end
          else
            errors << { key: key.key, errors: key.errors.full_messages }
          end
        end

        render json: {
          message: "Imported #{success} translations",
          errors: errors
        }
      end

      private

      def dump_cache(output)
        case params[:format]
        when 'json' then output.to_json
        when 'yaml' then YAML.dump(output).html_safe
        else output.to_json
        end
      end

      def index_etag
        translation = Translation.unscope(:order).order(:updated_at).last
        updated_at = translation ? translation.updated_at : ''
        [updated_at]
      end

      def translation_params(data)
        text = data[:text]
        { text: text.is_a?(Array) ? YAML.dump(text).gsub("---\n", '') : text }
      end
    end
  end
end
