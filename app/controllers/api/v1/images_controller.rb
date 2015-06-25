require 'uri'

module API
  module V1
    class ImagesController < ApiController

      def create
        location_path = URI.parse(params[:location]).path
        location = Location.where(path: location_path).first_or_create

        variant = 'desktop'
        params[:images].each do |data|
          variant = data[:variant]
          lookup_params = {
            location: location,
            name:     data[:name],
            variant:  data[:variant]
          }
          args = image_params(data).merge(location: location)
          Image.create args
        end

        params[:highlights].each do |data|
          locale = Locale.where(code: parse_locale(data)).first_or_create
          key    = Key.where(key: parse_key(data)).first_or_create

          image_lookup = {
            name:     data[:image_name],
            variant:  variant,
            location: location
          }
          image = Image.where(image_lookup).order(created_at: :desc).first

          highlight_lookup = {
            key:      key,
            locale:   locale,
            location: location
          }

          if highlight = Highlight.where(highlight_lookup).first
            highlight.update highlight_params(data).merge(image: image)
          else
            args = highlight_params(data)
              .merge(highlight_lookup)
              .merge(image: image)

            Highlight.create args
          end

          Image.where(image_lookup).each do |image|
            if image.highlights.count == 0
              image.delete
            end
          end
        end

        render json: {
          message: "Imported #{params[:images].size} images and #{params[:highlights].size} highlights"
        }
      end

      private

      def image_params(data)
        data.slice(:image, :name, :variant).permit(:image, :name, :variant)
      end

      def highlight_params(data)
        data.slice(:x, :y, :width, :height).permit(:x, :y, :width, :height)
      end

      def parse_key(data)
        data[:key].split('.', 2).last
      end

      def parse_locale(data)
        data[:key].split('.', 2).first
      end
    end
  end
end
