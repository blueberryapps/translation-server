module API
  module V1
    class TranslationsController < ApiController
  
      def self.last_updated_at(time = nil)
        time ? (@last_updated_at = time) : @last_updated_at
      end
      
      def self.cache(cache)
        cache ? (@cache = cache) : @cache
      end
    
      def index_head
        stale? etag: index_etag
        head :ok
      end

      def index
        return unless stale? etag: index_etag
        
        if self.last_updated_at == index_etag.first
          respond_with self.cache
        else
          self.cache Translation.dump_hash(Translation.include_dependencies)
          self.last_updated_at index_etag.first
          respond_with self.cache
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
