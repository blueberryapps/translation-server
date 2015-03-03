module API
  module V1
    class TranslationsController < ApiController

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

      private

      def index_etag
        translation = Translation.unscope(:order).order(:updated_at).last
        updated_at = translation ? translation.updated_at : ''
        [updated_at]
      end
    end
  end
end
