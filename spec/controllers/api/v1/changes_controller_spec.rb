require 'rails_helper'

RSpec.describe API::V1::ChangesController, type: :controller do

  let(:project) { create :project, id: 5, api_token: 'XYZZYX' }

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
        get :index, token: project.api_token
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end
    end
  end
end
