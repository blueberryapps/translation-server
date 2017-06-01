module APIFrontend
  module V1
    class ProjectsController < ApiController
      before_action :set_project, only: [:show, :update, :not_approved, :destroy]

      # GET /projects
      def index
        respond_with policy_scope(Project), each_serializer: ProjectSerializer
      end

      # GET /projects/1
      def show
        respond_with @project, serializer: ProjectSerializer
      end

      # POST /projects
      def create
        @project = current_user.projects.build(project_params)

        if @project.save
          respond_with @project, serializer: ProjectSerializer, json: @project, status: 201
        else
          render status: 400, json: { errors: @project.errors }
        end
      end

      def not_approved
        locale = @project.locales.find(params[:locale_id])
        translations = locale.translations.not_approved.includes(:key)
        keys = Key.hierarchy(translations.map(&:key))
        render json: {translations: translations.map { |translation| TranslationSerializer.new(translation) }, hierarchy: keys}
      end

      # PATCH/PUT /projects/1
      def update
        if @project.update(project_params)
          respond_with @project, serializer: ProjectSerializer, json: @project
        else
          render status: 400, json: { errors: @project.errors }
        end
      end

      # DELETE /projects/1
      def destroy
        @project.destroy
        render status: 200, json: { }
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_project
        @project = Project.find(params[:id])
        authorize @project
      end

      # Only allow a trusted parameter "white list" through.
      def project_params
        params.require(:project).permit(:name, :default_locale_id, :screenshots)
      end
    end
  end
end
