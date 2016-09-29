module API
  module V1
    class ChangesController < ApiController
      include ActionController::Live

      skip_before_filter :authenticate

      def index
        return render_unauthorized unless (current_project = Project.find_by(api_token: params[:token]))

        response.headers['Content-Type'] = 'text/event-stream'
        sse = SSE.new(response.stream, retry: 30)

        begin
          Translation.on_change(current_project) do |data|
            action, data = data.split(':', 2)
            # Base64.encode64('{}'') => "e30=\n"
            sse.write(JSON.parse(Base64.decode64(data || "e30=\n")), event: "translations_#{action}")
          end
        rescue IOError
          Translation.connection.execute 'UNLISTEN *'
          # Client Disconnected
        ensure
          sse.close
        end
      end
    end
  end
end
