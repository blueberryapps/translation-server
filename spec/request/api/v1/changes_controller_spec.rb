require 'rails_helper'

module API
  module V1
    describe 'Changes listener API Requests', type: :request do
      describe 'GET /api/v1/changes' do

        let(:api_user) { create :user, id: 5, api_key: 'XYZZYX' }

        before do
          allow(Translation).to receive(:on_change)
        end

        action do
          get '/api/v1/changes', { token: api_user.api_key }, {}
        end

        it 'returns stream of events' do
          expect(response.status).to eq 200
        end
      end
    end
  end
end
