module API
  module V1
    class ApiController < ActionController::Base

      before_filter :authenticate

      respond_to :json, :yaml

      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      private

      def authenticate
        authenticate_token || render_unauthorized
      end

      def authenticate_token
        authenticate_with_http_token do |token, _|
          @user = User.find_by(api_key: token)
        end
      end

      def current_user
        @user
      end

      def record_not_found
        render json: { errors: 'Not Found' }, status: :not_found
      end

      def render_unauthorized
        headers['WWW-Authenticate'] = 'Token realm="Application"'

        render json: { errors: { token: 'Bad credentials' } }, status: 401
      end
    end
  end
end
