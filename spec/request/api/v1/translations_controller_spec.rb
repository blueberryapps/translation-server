require 'rails_helper'

module API
  module V1
    describe 'Translations API Requests', type: :request do
      let(:api_user)  { create :user, id: 5, api_key: 'XYZZYX' }
      let(:cs)        { create :locale, code: 'cs' }
      let(:en)        { create :locale, code: 'en' }
      let(:key)       { create :key, key: 'foo.bar' }
      let(:array_key) { create :key, key: 'bar', data_type: 'array' }


      let(:headers) do
        { 'HTTP_AUTHORIZATION' => "Token token=#{api_user.api_key}" }
      end

      context 'not authorized' do
        let(:headers) do
          { 'HTTP_AUTHORIZATION' => "Token token=UNKNOWN_TOKEN" }
        end

        describe 'GET /api/v1/translations' do
          action do
            get '/api/v1/translations', {}, headers
          end

          it 'responds with Bad credentials' do
            expect(response.status).to eq 401
            expect(response.json.errors.token).to eq 'Bad credentials'
          end
        end
      end

      describe 'GET /api/v1/translations.json' do
        let!(:translations) do
          create :translation, locale: cs, key: key, text: 'cs translated text'
          create :translation, locale: en, key: key, text: 'en translated text'
          create :translation, locale: en, key: array_key, text: "- A \n- B"
        end

        action do
          get '/api/v1/translations.json', {}, headers
        end

        it 'responds with success' do
          expect(response.status).to eq 200
          expect(response.json.cs.foo.bar).to eq 'cs translated text'
          expect(response.json.en.foo.bar).to eq 'en translated text'
          expect(response.json.en.bar).to eq %w(A B)
        end
      end

      describe 'GET /api/v1/translations.yaml' do
        let!(:translations) do
          create :translation, locale: cs, key: key, text: 'cs translated text'
          create :translation, locale: en, key: key, text: 'en translated text'
          create :translation, locale: en, key: array_key, text: "- A \n- B"
        end

        action do
          get '/api/v1/translations.yaml', {}, headers
        end

        it 'responds with success' do
          expect(response.status).to eq 200
          expect(response.yaml.cs.foo.bar).to eq 'cs translated text'
          expect(response.yaml.en.foo.bar).to eq 'en translated text'
          expect(response.yaml.en.bar).to eq %w(A B)
        end
      end

      describe 'POST /api/v1/translations' do
        let(:headers) do
          {
            'HTTP_AUTHORIZATION' => "Token token=#{api_user.api_key}",
            'CONTENT_TYPE' => 'application/json'
          }
        end

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

        action do
          post '/api/v1/translations', attributes.to_json, headers
        end

        it 'responds with success' do
          expect(response.status).to eq 200
        end
      end
    end
  end
end