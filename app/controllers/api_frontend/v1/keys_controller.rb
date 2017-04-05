module APIFrontend
  module V1
    class KeysController < ApiController
      before_action :set_key, only: [:show, :update, :destroy]
      before_action :set_project

      def index
        respond_with @project.keys, each_serializer: KeySerializer
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
