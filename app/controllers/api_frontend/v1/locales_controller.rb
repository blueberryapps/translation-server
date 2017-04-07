module APIFrontend
  module V1
    class LocalesController < ApiController
      before_action :set_locale, only: [:show, :update, :destroy]
      before_action :set_project

      def index
        respond_with @project.locales, each_serializer: LocaleSerializer
      end

      def show
        respond_with @locale, serializer: LocaleSerializer
      end

      def create
        @locale = @project.locales.build(locale_params)

        if @locale.save
          respond_with @locale, serializer: LocaleSerializer, json: @locale, status: 201
        else
          render status: 400, json: { errors: @locale.errors }
        end
      end

      def update
        if @locale.update(locale_params)
          respond_with @locale, serializer: LocaleSerializer, json: @locale
        else
          render status: 400, json: { errors: @locale.errors }
        end
      end

      def destroy
        @locale.destroy
        render status: 200, json: { }
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_project
        @project = @locale ? @locale.project : Project.find(params[:project_id])
        authorize @project
      end

      def set_locale
        @locale = Locale.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def locale_params
        params.require(:locale).permit(:code)
      end
    end
  end
end
