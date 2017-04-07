module APIFrontend
  module V1
    class KeysController < ApiController

      before_action :set_key, only: [:show, :update, :destroy]
      before_action :set_project

      has_scope :page, default: 1, only: :index
      has_scope :per, as: :size, default: Kaminari.config.default_per_page, only: :index

      has_scope :with_locale, as: :locale_id, allow_blank: true
      has_scope :with_key_path, as: :key_path, allow_blank: true
      has_scope :with_edited, as: :edited, default: 'all'
      has_scope :with_query, as: :search, allow_blank: true

      def index
        scope = apply_scopes(@project.keys.alphabetical.preload(:translations))

        render json: scope, meta: PaginationSerializer.meta(scope)
      end

      def hierarchy
        scope = apply_scopes(@project.keys.alphabetical.preload(:translations))
        render json: @project.keys.hierarchy(scope)
      end

      def show
        render json: @key
      end

      def create
        @key = @project.keys.build(key_params)

        if @key.save
          render json: @key, status: 201
        else
          render status: 400, json: { errors: @key.errors }
        end
      end

      def update
        if @key.update(key_params)
          render json: @key
        else
          render status: 400, json: { errors: @key.errors }
        end
      end

      def destroy
        @key.destroy
        render status: 200, json: { }
      end

      private

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
