require 'rails_helper'

module API
  module V1
    describe 'Translations API Requests', type: :request do
      let(:project)   { create :project, id: 5, api_token: 'XYZZYX' }
      let(:cs)        { create :locale, code: 'cs', project: project }
      let(:en)        { create :locale, code: 'en', project: project }
      let(:key)       { create :key, key: 'foo.bar', project: project }
      let(:array_key) { create :key, key: 'bar', data_type: 'array', project: project }


      let(:headers) do
        { 'HTTP_AUTHORIZATION' => "Token token=#{project.api_token}" }
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

      describe 'HEAD /api/v1/translations' do
        it 'returns Etag' do
          head '/api/v1/translations', {}, headers
          expect(response.status).to eq(200)
          expect(response.headers['ETag']).not_to eq(nil)
        end
      end

      describe 'POST /api/v1/translations' do
        let(:headers) do
          {
            'HTTP_AUTHORIZATION' => "Token token=#{project.api_token}",
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
