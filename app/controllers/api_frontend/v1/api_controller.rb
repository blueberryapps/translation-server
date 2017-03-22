module APIFrontend
  module V1
    class ApiController < ActionController::Base
      include Pundit
      before_action :authenticate_user!

      rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      respond_to :json

      private

      def record_not_found(expection)
        render json: { errors: 'Not Found', message: expection.message },
               status: :not_found
      end

      def user_not_authorized
        headers['WWW-Authenticate'] = 'Token realm="Application"'

        render json: { errors: { token: 'Bad credentials' } }, status: 401
      end
    end
  end
end
