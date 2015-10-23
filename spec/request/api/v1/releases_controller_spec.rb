require 'rails_helper'

module API
  module V1
    describe 'Releases API Requests', type: :request do

      let(:locale_cs) { Locale.resolve code: 'cs' }
      let(:locale_en) { Locale.resolve code: 'en' }
      let(:key1)      { Key.resolve key: 'foo.bar' }
      let(:key2)      { Key.resolve key: 'bar.foo' }

      let(:api_user) { create :user, id: 5, api_key: 'XYZZYX' }

      let(:headers) do
        { 'HTTP_AUTHORIZATION' => "Token token=#{api_user.api_key}" }
      end

      before do

        text_v1 = Translation.create key: key1, locale: locale_cs, text: 'Super'
        Translation.create key: key2, locale: locale_cs, text: 'Translation'
        Translation.create key: key1, locale: locale_en, text: 'Translated'

        @release1 = Release.create locale: locale_cs

        text_v1.update text: 'Released2'

        @release2 = Release.create locale: locale_cs

        @release_en = Release.create locale: locale_en
      end

      describe 'GET /api/v1/releases' do
        action do
          get '/api/v1/releases', {}, headers
        end

        it 'returns 200 status code' do
          expect(response.status).to eq(200)
          expect(response.json.releases.size).to eq(3)
          release = response.json.releases.first
          expect(release.locale).to  eq('cs')
          expect(release.version).to eq('cs_v001')
        end
      end

      describe "GET /api/v1/releases/:version.yaml" do
        context 'version 1' do
          it 'returns valid yaml version 1' do
            get "/api/v1/releases/#{@release1.version}.yaml", {}, headers
            expect(response.status).to eq(200)
            expect(response.yaml.cs.foo.bar).to eq('Super')
            expect(response.yaml.cs.bar.foo).to eq('Translation')
          end
        end

        context 'version 2' do
          it 'returns valid yaml for version 2', action: false do
            get "/api/v1/releases/#{@release2.version}.yaml", {}, headers
            expect(response.status).to eq(200)
            expect(response.yaml.cs.foo.bar).to eq('Released2')
            expect(response.yaml.cs.bar.foo).to eq('Translation')
          end
        end

        context 'dirrefent locales in one release' do
          it 'returns valid yaml for version 2', action: false do
            get "/api/v1/releases/#{@release2.version},#{@release_en.version}.yaml", {}, headers
            expect(response.status).to eq(200)
            expect(response.yaml.cs.foo.bar).to eq('Released2')
            expect(response.yaml.cs.bar.foo).to eq('Translation')
            expect(response.yaml.en.foo.bar).to eq('Translated')
          end
        end
      end

      describe 'HEAD /api/v1/releases' do
        it 'returns Etag' do
          head '/api/v1/releases', {}, headers
          expect(response.status).to eq(200)
          expect(response.headers['ETag']).not_to eq(nil)
        end
      end

      describe 'HEAD /api/v1/releases/:version' do
        it 'returns valid yaml version 1' do
          head "/api/v1/releases/#{@release1.version}", {}, headers
          expect(response.status).to eq(200)
          expect(response.headers['ETag']).not_to eq(nil)
        end
      end
    end
  end
end
