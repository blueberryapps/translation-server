require 'rails_helper'

RSpec.describe APIFrontend::V1::ProjectsController, type: :controller do
  include ApiResponse
  let(:user)     { create(:user) }
  let!(:project) { create :project, id: 5, api_token: 'XYZZYX', users: [user] }
  before         { sign_in user }

  let(:valid_attributes) {
    attributes_for :project
  }

  let(:invalid_attributes) {
    { name: '' }
  }

  describe 'GET #index' do
    action do
      get :index
    end

    it 'response 200' do
      expect(response.status).to eq(200)
    end

    it 'response content type' do
      expect(response.content_type).to eq('application/json')
    end

    it 'responses with data' do
      expect(api_response.projects.first.id).to eq(project.id)
    end
  end

  describe 'GET #show' do
    context 'existing project' do
      action do
        get :show, id: project.to_param
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.project.id).to eq(project.id)
      end
    end

    context 'non existing project' do
      action do
        get :show, id: -1
      end

      it 'response 404' do
        expect(response.status).to eq(404)
      end
    end
  end

  describe 'POST #create' do
    context 'valid response' do
      action do
        post :create, project: valid_attributes
      end

      it 'response 201' do
        expect(response.status).to eq(201)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.project.name).to eq(valid_attributes[:name])
      end
    end

    context 'invalid response' do
      action do
        post :create, project: invalid_attributes
      end

      it 'response 400' do
        expect(response.status).to eq(400)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.errors.name).to eq(['is too short (minimum is 3 characters)'])
      end
    end
  end

  describe 'PUT #update' do
    context 'valid response' do
      action do
        put :update, id: project.to_param, project: { name: 'changed name' }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.project.name).to eq('changed name')
      end
    end

    context 'invalid response' do
      action do
        put :update, id: project.to_param, project: { name: '' }
      end

      it 'response 400' do
        expect(response.status).to eq(400)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.errors.name).to eq(['is too short (minimum is 3 characters)'])
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'valid response' do
      action do
        delete :destroy, id: project.to_param
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end
    end

    context 'nonexisting project' do
      action do
        delete :destroy, id: -1
      end

      it 'response 404' do
        expect(response.status).to eq(404)
      end
    end
  end
end
