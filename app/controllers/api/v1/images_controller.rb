require 'uri'

module API
  module V1
    class ImagesController < ApiController

      def create
        location_path = URI.parse(params[:location]).path
        location = Location.where(path: location_path).first_or_create

        params[:images].each do |data|
          if image = Image.where(location: location, name: data[:name]).first
            image.update image_params(data)
          else
            args = image_params(data).merge(
              location: location,
              name: data[:name]
            )
            image = Image.create args
          end
        end

        params[:highlights].each do |data|
          key   = Key.where(key: data[:key].split('.', 2).last).first_or_create
          image = Image.where(name: data[:image_name]).first

          if highlight = Highlight.where(image: image, key: key).first
            highlight.update highlight_params(data)
          else
            args = highlight_params(data).merge(image: image, key: key)
            Highlight.create args
          end
        end

        render json: {
          message: "Imported #{params[:images].size} images"
        }
      end

      private

      def image_params(data)
        data.slice(:image).permit(:image)
      end

      def highlight_params(data)
        data.slice(:x, :y, :width, :height).permit(:x, :y, :width, :height)
      end
    end
  end
end
