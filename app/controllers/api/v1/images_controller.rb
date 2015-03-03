module API
  module V1
    class ImagesController < ApiController

      def create
        location = Location.where(path: params[:location]).first_or_create
        locale   = Locale.where(code: params[:locale]).first_or_create

        params[:images].each do |data|
          key = Key.where(key: data[:key]).first_or_create

          if image = Image.where(location: location, key: key).first
            image.update imaga_params(data)
          else
            Image.create imaga_params(data).merge(location: location, key: key)
          end
        end

        render json: {
          message: "Imported #{params[:images].size} images"
        }
      end

      private

      def imaga_params(data)
        data.slice(:image, :x, :y, :width, :height)
            .permit(:image, :x, :y, :width, :height)
      end
    end
  end
end
