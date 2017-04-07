module APIFrontend
  module V1
    class TranslationsController < ApiController
      before_action :set_translation
      before_action :set_project

      def show
        render json: @translation
      end

      def update
        if @translation.update(translation_params)
          render json: @translation
        else
          render status: 400, json: { errors: @translation.errors }
        end
      end

      def destroy
        @translation.destroy
        render status: 200, json: { }
      end

      private

      def set_translation
        @translation = Translation.find(params[:id])
      end

      def set_project
        @project = @translation.key.project
        authorize @project
      end

      def translation_params
        params.require(:translation).permit(:text)
      end
    end
  end
end
