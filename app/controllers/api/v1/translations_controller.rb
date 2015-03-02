module API
  module V1
    class TranslationsController < ApiController
      def index
        output = Translation.all.each_with_object({}) do |translation, hash|
          hash.deep_merge!(translation.to_h)
        end

        render json: output

        #return unless stale? etag: index_etag

        # @invoices = apply_scopes(Invoice.with_lines)
        # respond_with @invoices,
        #              serializer: PaginationSerializer,
        #              meta: { scopes: current_scopes, filter: filter_params }
      end

      def create
        params[:translations].each do |data|
          path_parts = data[:key].split('.', 2)

          location = Location.where(path: data[:path]).first_or_create
          locale   = Locale.where(code: path_parts.first).first_or_create
          key      = Key.where(key: path_parts.last).first_or_create

          update_data = data.slice(:image, :x, :y, :width, :height).permit(:image, :x, :y, :width, :height)
          if image = Image.where(location: location, key: key).first
            image.update update_data
          else
            Image.create update_data.merge(location: location, key: key)
          end
        end

        render json: {
          message: "Imported #{params[:translations].size} images"
        }
        # @invoice = Invoice.new(invoice_params)
        # if @invoice.save
        #   render json: @invoice, status: :created
        # else
        #   render json: { errors: @invoice.errors },
        #          status: :unprocessable_entity
        # end
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
