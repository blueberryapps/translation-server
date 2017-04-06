require 'rails_helper'

RSpec.describe APIFrontend::V1::KeysController, type: :controller do
  include ApiResponse
  let(:user)     { create(:user) }
  let!(:project) { create :project, id: 5, api_token: 'XYZZYX', users: [user]}
  let!(:locale)  { create :locale, :with_translations, project: project }
  let!(:key)     { project.keys.first }
  before         { sign_in user }

  let(:valid_attributes) {
    attributes_for :key
  }


  let(:invalid_attributes) {
    { key: '' }
  }

  before :each do
    request.headers["accept"] = 'application/json'
  end

  describe 'GET #index' do
    context 'without searching' do
      action do
        get :index, project_id: project.id
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      # TODO fix or remove
      # it 'responses with data' do
      #   expect(api_response.fetch('keys')).to include(KeySerializer.new(key).to_json)
      # end

      it 'responses with keys of project' do
        expect(api_response.fetch('keys').first.fetch('key')).to eq(key.key)
      end
    end

    context 'with searching' do
      it 'responses with paginated keys' do
        get :index, project_id: project.id, search: {size: 1}

        expect(api_response.fetch('keys').count).to eq(1)
      end

      it 'responses with default pagination' do
        get :index, project_id: project.id, search: {}

        expect(api_response.fetch('keys').count).to eq(2)
      end

      it 'responses with second page' do
        get :index, project_id: project.id, search: {size: 1, page: 2}

        expect(api_response.fetch('keys').count).to eq(1)
        expect(api_response.fetch('keys').first.fetch('key')).to eq(project.keys.last.key)
      end
    end
  end

  describe 'GET #show' do
    context 'existing locale' do
      action do
        get :show, id: key.to_param
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.fetch('key').id).to eq(key.id)
      end
    end

    context 'non existing locale' do
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
        post :create, project_id: project.id, key: valid_attributes
      end

      it 'response 201' do
        expect(response.status).to eq(201)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.fetch('key').fetch('key')).to eq(valid_attributes[:key])
      end
    end

    context 'invalid response' do
      action do
        post :create, project_id: project.id, key: invalid_attributes
      end

      it 'response 400' do
        expect(response.status).to eq(400)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.errors.fetch('key')).to eq(["is too short (minimum is 1 character)", "is invalid"])
      end
    end
  end

  describe 'PUT #update' do
    context 'valid response' do
      action do
        put :update, id: key.to_param, key: { key: 'changed' }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.fetch('key').fetch('key')).to eq('changed')
      end
    end

    context 'invalid response' do
      action do
        put :update, id: key.to_param, key: { key: '' }
      end

      it 'response 400' do
        expect(response.status).to eq(400)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.errors.fetch('key')).to eq(["is too short (minimum is 1 character)", "is invalid"])
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'valid response' do
      action do
        delete :destroy, id: key.to_param
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end
    end

    context 'nonexisting locale' do
      action do
        delete :destroy, id: -1
      end

      it 'response 404' do
        expect(response.status).to eq(404)
      end
    end
  end
end
