module APIFrontend
  module V1
    class ReleasesController < ApiController
      before_action :set_release, only: [:show]
      before_action :set_project

      def index
        respond_with @project.releases, each_serializer: ReleaseSerializer
      end

      def show
        respond_with @release, serializer: ReleaseDetailSerializer
      end

      def create
        @release = @project.releases.build(locale_params)

        if @release.save
          respond_with @release, serializer: ReleaseDetailSerializer, json: @release, status: 201
        else
          render status: 400, json: { errors: @release.errors }
        end
      end

      def destroy
        @release.destroy
        render status: 200, json: { }
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_project
        @project = @release ? @release.project : Project.find(params[:project_id])
        authorize @project
      end

      def set_release
        @release = Release.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def release_params
        params.require(:release).permit(:locale)
      end
    end
  end
end
