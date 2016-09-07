module API
  module V1
    class ChangesController < ApiController
      include ActionController::Live

      skip_before_filter :authenticate

      def index
        return render_unauthorized unless User.find_by(api_key: params[:token])

        response.headers['Content-Type'] = 'text/event-stream'
        sse = SSE.new(response.stream)

        begin
          Translation.on_change do |data|
            sse.write({}, event: 'translations_changed')
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
