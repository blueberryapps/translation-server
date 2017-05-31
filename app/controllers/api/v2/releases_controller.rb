module API
  module V2
    class ReleasesController < ApiController
      before_action :set_releases, only: [:show, :show_head]

      def index_head
        stale? etag: index_etag
        head :ok
      end

      def show_head
        stale? etag: show_etag
        head :ok
      end

      def index
        return unless stale? etag: index_etag

        @releases = current_project.releases.newest_last.only_list

        respond_with releases: @releases.map(&:to_list)
      end

      def show
        return unless stale? etag: show_etag

        respond_with @releases
      end

      private

      def index_etag
        release = current_project.releases.unscope(:order).order(:updated_at).last
        updated_at = release ? release.updated_at : ''
        [updated_at]
      end

      def set_releases
        ids = params[:id].split(',')
        @releases = Release.with_versions(ids, current_project)

        unless @releases.any?
          raise ActiveRecord::RecordNotFound,
                "Release could not be found by version: #{params[:id]}"
        end
      end

      def show_etag
        [@releases.map(&:updated_at) || ''].flatten
      end

      def translation_params(data)
        data.slice(:text).permit(:text)
      end
    end
  end
end
