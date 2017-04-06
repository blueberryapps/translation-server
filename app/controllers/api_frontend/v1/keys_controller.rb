module APIFrontend
  module V1
    class KeysController < ApiController
      DEFAULT_PER_PAGE = Kaminari.config.default_per_page

      before_action :set_key, only: [:show, :update, :destroy]
      before_action :set_project
      before_action :set_locale

      def index
        scope = @project.keys.alphabetical

        if @locale
          scope = scope.with_locale(@locale)
        end

        page = params[:page].to_i || 1
        size = params[:size].to_i || DEFAULT_PER_PAGE
        scope = scope.page(page).per(size)

        # if options = search_params[:options]
        #   scope = scope.with_key_path(key_path) if key_path = options[:key_path]
        #   scope = scope.with_locale(locale)     if locale = options[:with_locale]
        #   scope = scope.with_query(query)       if query = options[:search]
        # end

        respond_with scope, serializer: PaginationSerializer
      end

      def show
        respond_with @key, serializer: KeySerializer
      end

      def create
        @key = @project.keys.build(key_params)

        if @key.save
          respond_with @key, serializer: KeySerializer, json: @key, status: 201
        else
          render status: 400, json: { errors: @key.errors }
        end
      end

      def update
        if @key.update(key_params)
          respond_with @key, serializer: KeySerializer, json: @key
        else
          render status: 400, json: { errors: @key.errors }
        end
      end

      def destroy
        @key.destroy
        render status: 200, json: { }
      end

      private
      def set_locale
        if params[:locale_id]
          @locale = @project.locales.find(params[:locale_id])
        end
      end


      # Use callbacks to share common setup or constraints between actions.
      def set_project
        @project = @key ? @key.project : Project.find(params[:project_id])
        authorize @project
      end

      def set_key
        @key = Key.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def key_params
        params.require(:key).permit(:key, :note, :data_type)
      end
    end
  end
end
