module API
  module V1
    class TranslationsController < ApiController

      def index_head
        stale? etag: index_etag
        head :ok
      end

      def index
        return unless stale? etag: index_etag

        @translations = Translation.all.each_with_object({}) do |translation, hash|
          output =  if params[:hierarchical]
                      translation.to_hierarchical_h
                    else
                      translation.to_h
                    end
          hash.deep_merge! output
        end

        respond_with @translations
      end

      def create
        location = Location.where(path: params[:location]).first_or_create
        locale   = Locale.where(code: params[:locale]).first_or_create
        default_image = Image.where(location: location, name: location.path).first_or_create
        params[:translations].each do |data|
          key = Key.where(key: data[:key].split('.', 2).last)
                   .first_or_create(data_type: data[:data_type])

          unless Translation.where(locale: locale, key: key).first
            Translation.create translation_params(data).merge(locale: locale, key: key)
          end
          Highlight.where(image: default_image, key: key).first_or_create
        end

        render json: {
          message: "Imported #{params[:translations].size} translations"
        }

      end

      private

      def index_etag
        translation = Translation.unscope(:order).order(:updated_at).last
        updated_at = translation ? translation.updated_at : ''
        [updated_at]
      end

      def translation_params(data)
        data.slice(:text).permit(:text)
      end
    end
  end
end
