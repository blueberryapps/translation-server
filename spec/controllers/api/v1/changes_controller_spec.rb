require 'rails_helper'

RSpec.describe API::V1::ChangesController, type: :controller do

  let(:api_user) { create :user, id: 5, api_key: 'XYZZYX' }

  before do
    allow(Translation).to receive(:on_change)
  end

  describe 'GET #index' do
    context 'without authorization' do
      action do
        get :index, token: 'INVALID'
      end

      it 'response 401' do
        expect(response.status).to eq(401)
      end
    end

    context 'with authorization' do
      action do
        get :index, token: api_user.api_key
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end
    end
  end
end
