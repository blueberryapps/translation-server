require 'uri'

module API
  module V1
    class ImagesController < ApiController

      def create
        location_path = URI.parse(params[:location]).path
        location = Location.where(path: location_path).first_or_create
        locale   = Locale.where(code: params[:locale]).first_or_create

        variant = 'desktop'
        params[:images].each do |data|
          variant = data[:variant]
          lookup_params = {
            location: location,
            locale:   locale,
            name:     data[:name],
            variant:  data[:variant]
          }
          if image = Image.where(lookup_params).first
            image.update image_params(data)
          else
            args = image_params(data).merge(location: location, locale: locale)
            image = Image.create args
          end
        end

        params[:highlights].each do |data|
          key   = Key.where(key: data[:key].split('.', 2).last).first_or_create
          image = Image.where(name: data[:image_name], locale: locale, variant: variant).first

          if highlight = Highlight.where(image: image, key: key, locale: locale).first
            highlight.update highlight_params(data)
          else
            args = highlight_params(data).merge(image: image, key: key, locale: locale)
            Highlight.create args
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
    end
  end
end
