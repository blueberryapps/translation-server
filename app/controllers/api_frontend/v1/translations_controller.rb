module APIFrontend
  module V1
    class TranslationsController < ApiController
      before_action :set_translation, except: :update_many
      before_action :set_project, except: :update_many

      def show
        render json: @translation
      end

      def update
        if @translation.update(translation_params.merge(edited: true))
          render json: @translation
        else
          render status: 400, json: { errors: @translation.errors }
        end
      end

      def update_many
        translations = translations_params.map do |tp|
          pp tp
          if translation = Translation.where(id: tp[:id]).first
            authorize translation.key.project

            translation.update(text: tp[:text])
            translation
          else
            { id: tp[:id], error: "Unable to find id" }
          end
        end
        render json: translations
      end

      def destroy
        @translation.destroy
        render status: 200, json: { }
      end

      private

      def set_translation
        if params[:key] && params[:locale] && params[:api_token]
          project = Project.find_by(api_token: params[:api_token])
          key = project.keys.find_by(key: params[:key])
          locale = project.locales.find_by(code: params[:locale])
          @translation = Translation.find_by(key: key, locale: locale)
        else
          @translation = Translation.find(params[:id])
        end
      end

      def set_project
        @project = @translation.key.project
        authorize @project
      end

      def translations_params
        params[:translations]
      end

      def translation_params
        params.require(:translation).permit(:text)
      end
    end
  end
end
