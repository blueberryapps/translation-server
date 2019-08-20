require 'rails_helper'

RSpec.describe API::V1::TranslationsController, type: :controller do

  let(:attributes) do
    {
      location: '/register',
      locale:   'cs',
      translations: [
        { key:  'cs.foo.bar', text: 'transalted text' },
        { key:  'cs.foo.foo', text: 'super text' },
        { key:  'cs.bar', text: 'foo text' }
      ]
    }
  end

  let(:project) { create :project, id: 5, api_token: 'XYZZYX', screenshots: true }

  before do
    @request.env["HTTP_AUTHORIZATION"] = "Token token=#{project.api_token}"
  end

  describe 'GET #index' do
    action do
      get :index, format: format
    end

    context 'json' do
      let(:format) { 'json' }

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/json')
      end

      it 'response headers does not contain CustomCache' do
        expect(response.headers).not_to have_key('CustomCache')
      end

      context 'with cache' do
        before do
          get :index, format: format
        end

        it 'response 200' do
          expect(response.status).to eq(200)
        end

        it 'response content type' do
          expect(response.content_type).to eq('application/json')
        end

        it 'response headers does not contain CustomCache' do
          expect(response.headers).to have_key('CustomCache')
        end
      end
    end

    context 'yaml' do
      let(:format) { 'yaml' }

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'response content type' do
        expect(response.content_type).to eq('application/x-yaml')
      end

      context 'with cache' do
        before do
          get :index, format: format
        end

        it 'response 200' do
          expect(response.status).to eq(200)
        end

        it 'response content type' do
          expect(response.content_type).to eq('application/x-yaml')
        end
      end
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      action do
        post :create, params: attributes
      end

      it 'rep' do
        expect(response.status).to eq(200)
      end

      it 'creates a new Translations', action: false do
        expect {
          post :create, params: attributes
        }.to change(Translation, :count).by(3)
      end

      it 'creates keys' do
        expect(Key.where(key: 'foo.bar').size).to eq(1)
        expect(Key.where(key: 'foo.foo').size).to eq(1)
        expect(Key.where(key: 'bar').size).to eq(1)
      end

      it 'creates location' do
        expect(Location.where(path: '/register').size).to eq(1)
      end

      it 'creates locale' do
        expect(Locale.where(code: 'cs').size).to eq(1)
      end
    end
  end
end
