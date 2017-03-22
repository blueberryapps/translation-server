module APIFrontend
  module V1
    class ProjectsController < ApiController
      before_action :set_project, only: [:show, :update, :destroy]

      # GET /projects
      def index
        @projects = policy_scope(Project)
        render json: { projects: @projects }
      end

      # GET /projects/1
      def show
        render json: { project: @project }
      end

      # POST /projects
      def create
        @project = current_user.projects.build(project_params)

        if @project.save
          render status: 201, json: { project: @project }
        else
          render status: 400, json: { errors: @project.errors }
        end
      end

      # PATCH/PUT /projects/1
      def update
        if @project.update(project_params)
          render status: 200, json: { project: @project }
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
