require 'rails_helper'

module API
  module V1
    describe 'Translations API Requests', type: :request do
      let(:api_user) { create :user, id: 5, api_key: 'XYZZYX' }

      let(:headers) do
        { 'HTTP_AUTHORIZATION' => "Token token=#{api_user.api_key}" }
      end

      context 'human readable' do
        describe 'GET /api/v1/translations.json?hierarchical=true' do
          let(:cs)  { create :locale, code: 'cs' }
          let(:en)  { create :locale, code: 'en' }
          let(:key) { create :key, key: 'foo.bar' }
          let(:array_key) { create :key, key: 'bar', array: true }

          let!(:translations) do
            create :translation, locale: cs, key: key, text: 'cs translated text'
            create :translation, locale: en, key: key, text: 'en translated text'
            create :translation, locale: en, key: array_key, text: "- A \n- B"
          end

          action do
            get '/api/v1/translations.json', { hierarchical: true }, headers
          end

          it 'responds with success' do
            expect(response.status).to eq 200
            expect(response.json.cs.foo.bar).to eq 'cs translated text'
            expect(response.json.en.foo.bar).to eq 'en translated text'
            expect(response.json.en.bar).to eq %w(A B)
          end
        end

        describe 'GET /api/v1/translations.yaml?hierarchical=true' do
          let(:cs)  { create :locale, code: 'cs' }
          let(:en)  { create :locale, code: 'en' }
          let(:key) { create :key, key: 'foo.bar' }
          let(:array_key) { create :key, key: 'bar', array: true }

          let!(:translations) do
            create :translation, locale: cs, key: key, text: 'cs translated text'
            create :translation, locale: en, key: key, text: 'en translated text'
            create :translation, locale: en, key: array_key, text: "- A \n- B"
          end

          action do
            get '/api/v1/translations.yaml', { hierarchical: true }, headers
          end

          it 'responds with success' do
            expect(response.status).to eq 200
            expect(response.yaml.cs.foo.bar).to eq 'cs translated text'
            expect(response.yaml.en.foo.bar).to eq 'en translated text'
            expect(response.yaml.en.bar).to eq %w(A B)
          end
        end
      end

      context 'machine readable' do
        describe 'GET /api/v1/translations.json' do
          let(:cs)  { create :locale, code: 'cs' }
          let(:en)  { create :locale, code: 'en' }
          let(:key) { create :key, key: 'foo.bar' }
          let(:array_key) { create :key, key: 'bar', array: true }

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
            expect(response.json['cs.foo.bar']).to eq 'cs translated text'
            expect(response.json['en.foo.bar']).to eq 'en translated text'
            expect(response.json['en.bar']).to eq %w(A B)
          end
        end

        describe 'GET /api/v1/translations.yaml' do
          let(:cs)  { create :locale, code: 'cs' }
          let(:en)  { create :locale, code: 'en' }
          let(:key) { create :key, key: 'foo.bar' }
          let(:array_key) { create :key, key: 'bar', array: true }

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
            expect(response.yaml['cs.foo.bar']).to eq 'cs translated text'
            expect(response.yaml['en.foo.bar']).to eq 'en translated text'
            expect(response.yaml['en.bar']).to eq %w(A B)
          end
        end
      end
    end
  end
end
