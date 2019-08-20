require 'rails_helper'

RSpec.describe APIFrontend::V1::KeysController, type: :controller do
  include ApiResponse
  let(:user)     { create(:user) }
  let!(:project) { create :project, id: 5, api_token: 'XYZZYX', users: [user]}
  let!(:locale)  { create :locale, :with_translations, project: project }
  let!(:key)     { project.keys.first }

  let!(:translation) do
    key.translations.where(locale: locale).first
  end

  before { sign_in user }

  let(:valid_attributes) { attributes_for :key }
  let(:invalid_attributes) { { key: '' } }

  before :each do
    request.headers["accept"] = 'application/json'
  end

  describe 'GET #index' do
    context 'without searching' do
      action do
        get :index, params: { project_id: project.id }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.fetch('keys').map(&:id)).to include(key.id)
      end

      it 'responses with keys of project' do
        expect(api_response.fetch('keys').first.fetch('key')).to eq(key.key)
      end

      it 'responses with translations in keys of project' do
        expect(api_response.fetch('keys').first.translations.first.text)
          .to eq(translation.text)
      end
    end

    context 'with searching' do
      it 'responses with paginated keys' do
        get :index, params: { project_id: project.id, size: 1 }

        expect(api_response.fetch('keys').count).to eq(1)
      end

      it 'responses with default pagination' do
        get :index, params: { project_id: project.id }

        expect(api_response.fetch('keys').count).to eq(2)
      end

      it 'responses with second page' do
        get :index, params: { project_id: project.id, size: 1, page: 2 }

        expect(api_response.fetch('keys').count).to eq(1)
        expect(api_response.fetch('keys').first.fetch('key')).to eq(project.keys.last.key)
      end

      it 'response should have pagination in meta for first page' do
        get :index, params: { project_id: project.id, size: 1, page: 1 }
        pagination = api_response.meta.pagination

        expect(pagination).to include(current_page: 1)
        expect(pagination).to include(prev_page: nil)
        expect(pagination).to include(next_page: 2)
        expect(pagination).to include(total_pages: 2)
        expect(pagination).to include(total_count: 2)
      end

      it 'response should have pagination in meta for second page' do
        get :index, params: { project_id: project.id, size: 1, page: 2 }
        pagination = api_response.meta.pagination

        expect(pagination).to include(current_page: 2)
        expect(pagination).to include(prev_page: 1)
        expect(pagination).to include(next_page: nil)
        expect(pagination).to include(total_pages: 2)
        expect(pagination).to include(total_count: 2)
      end

      context 'with locale scope' do
        let!(:locale2) { create :locale, :with_translations, project: project }

        before do
          locale.translations.map(&:key).each do |locale1_key|
            Translation.create locale: locale2, key: locale1_key, text: 'SECOND'
          end
        end

        it 'responses with keys of one locale' do
          get :index, params: { project_id: project.id, locale_id: locale.id }

          expect(api_response.fetch('keys').map(&:id))
            .to eq(locale.translations.map(&:key).map(&:id))
        end
      end
    end
  end

  describe 'GET #hierarchy' do
    context 'existing locale' do
      action do
        get :hierarchy, params: { project_id: project.id }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response).to eq(project.keys.hierarchy(project.keys))
      end
    end
  end

  describe 'GET #show' do
    context 'existing locale' do
      action do
        get :show, params: { id: key.to_param }
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
        get :show, params: { id: -1 }
      end

      it 'response 404' do
        expect(response.status).to eq(404)
      end
    end
  end

  describe 'POST #create' do
    context 'valid response' do
      action do
        post :create, params: { project_id: project.id, key: valid_attributes }
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
        post :create, params: { project_id: project.id, key: invalid_attributes }
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
        put :update, params: { id: key.to_param, key: { key: 'changed' } }
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
        put :update, params: { id: key.to_param, key: { key: '' } }
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
        delete :destroy, params: { id: key.to_param }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end
    end

    context 'nonexisting locale' do
      action do
        delete :destroy, params: { id: -1 }
      end

      it 'response 404' do
        expect(response.status).to eq(404)
      end
    end
  end
end
