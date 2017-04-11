require 'rails_helper'

RSpec.describe APIFrontend::V1::UsersController, type: :controller do
  include ApiResponse
  let(:user) { create(:user) }

  before :each do
    request.headers["accept"] = 'application/json'
  end

  describe 'GET #show' do
    context 'authorized' do
      action do
        sign_in user
        get :show
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with id' do
        expect(api_response.user.id).to eq(user.id)
      end

      it 'responses with username' do
        expect(api_response.user.username).to eq(user.username)
      end

      it 'responses with email' do
        expect(api_response.user.email).to eq(user.email)
      end

      it 'responses with photo' do
        expect(api_response.user.photo).to eq(user.photo_url(20))
      end
    end

    context 'unauthorized' do
      action do
        get :show
      end

      it 'response 401' do
        expect(response.status).to eq(401)
      end

    end
  end

  describe 'POST #create' do
    context 'authorized' do
      action do
        post :create, user: { email: user.email, password: user.password }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with id' do
        expect(api_response.user.id).to eq(user.id)
      end

      it 'responses with username' do
        expect(api_response.user.username).to eq(user.username)
      end

      it 'responses with email' do
        expect(api_response.user.email).to eq(user.email)
      end

      it 'responses with photo' do
        expect(api_response.user.photo).to eq(user.photo_url(20))
      end
    end

    context 'unauthorized' do
      action do
        post :create, user: { email: user.email, password: 'INVALID' }
      end

      it 'response 401' do
        expect(response.status).to eq(401)
      end

    end
  end

  describe 'DELETE #destroy' do
    context 'authorized' do
      action do
        sign_in user
      end

      it 'response 401' do
        delete :destroy
        expect(response.status).to eq(200)
        get :show
        expect(response.status).to eq(401)
      end
    end
  end
end
