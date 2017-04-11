module APIFrontend
  module V1
    class UsersController < ApiController
      prepend_before_filter :allow_params_authentication!, only: :create
      before_action :authenticate_user!

      def show
        render json: current_user
      end

      def create
        render json: current_user
      end

      def destroy
        sign_out :user
        render json: {}
      end
    end
  end
end
