require 'rails_helper'

RSpec.describe APIFrontend::V1::TranslationsController, type: :controller do
  include ApiResponse
  let(:user)     { create(:user) }
  let!(:project) { create :project, id: 5, api_token: 'XYZZYX', users: [user] }
  let!(:locale)  { create :locale, :with_translations, project: project }
  let!(:key)     { project.keys.first }

  let!(:translation) do
    key.translations.where(locale: locale).first
  end

  before         { sign_in user }

  let(:valid_attributes) {
    attributes_for :translation
  }

  let(:invalid_attributes) {
    { name: '' }
  }

  before :each do
    request.headers["accept"] = 'application/json'
  end

  describe 'GET #show' do
    context 'existing translation' do
      action do
        get :show, params: { id: translation.to_param }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.translation.id).to eq(translation.id)
      end

      it 'responses with text of translation' do
        expect(api_response.translation.text).to eq(translation.text)
      end
    end

    context 'non existing translation' do
      action do
        get :show, params: { id: -1 }
      end

      it 'response 404' do
        expect(response.status).to eq(404)
      end
    end
  end

  describe 'PUT #update' do
    context 'valid response' do
      action do
        put :update, params: { id: translation.to_param, translation: { text: 'changed text' } }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'responses with data' do
        expect(api_response.translation.text).to eq('changed text')
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'valid response' do
      action do
        delete :destroy, params: { id: translation.to_param }
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end
    end

    context 'nonexisting translation' do
      action do
        delete :destroy, params: { id: -1 }
      end

      it 'response 404' do
        expect(response.status).to eq(404)
      end
    end
  end
end
