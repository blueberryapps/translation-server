module APIFrontend
  module V1
    class ReleasesController < ApiController
      before_action :set_release, only: [:show, :destroy]
      before_action :set_project

      has_scope :with_locale, as: :locale_id, allow_blank: true

      def index
        respond_with apply_scopes(@project.releases.newest_first), each_serializer: ReleaseSerializer
      end

      def show
        respond_with @release, serializer: ReleaseDetailSerializer
      end

      def create
        ids = params[:translation_ids] || []
        if ids && ids.any?
          translations = @project.locales.find(params[:release][:locale_id]).translations.where(id: ids)
          if translations.size != ids.size
            return render status: 400, json: { errors: 'Can not approve all translations, because translations are not in given project', found_translations: translations.size, wanted_ids: ids.size }
          end
          Translation.approve!(translations, current_user)
        end

        @release = @project.releases.build(release_params.merge(user: current_user))

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
        params.require(:release).permit(:locale_id)
      end
    end
  end
end
