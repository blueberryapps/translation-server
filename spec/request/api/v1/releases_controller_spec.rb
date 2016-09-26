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
        textv_en_v1 = Translation.create key: key1, locale: locale_en, text: 'Translated'

        @release1 = Release.create locale: locale_cs

        text_v1.update text: 'Released2'

        @release2 = Release.create locale: locale_cs

        @release_en = Release.create locale: locale_en

        textv_en_v1.update text: 'Latest release'

        @release2_en = Release.create locale: locale_en
      end

      describe 'GET /api/v1/releases' do
        action do
          get '/api/v1/releases', {}, headers
        end

        it 'returns 200 status code' do
          expect(response.status).to eq(200)
          expect(response.json.releases.size).to eq(4)
          release = response.json.releases.first
          expect(release.locale).to  eq('cs')
          expect(release.version).to eq('cs_v001')
        end
      end

      describe "GET /api/v1/releases/:version.json" do
        context 'version 1' do
          it 'returns valid json version 1' do
            get "/api/v1/releases/#{@release1.version}.json", {}, headers
            expect(response.status).to eq(200)
            expect(response.json.cs.foo.bar).to eq('Super')
            expect(response.json.cs.bar.foo).to eq('Translation')
          end
        end

        context 'version 2' do
          it 'returns valid json for version 2', action: false do
            get "/api/v1/releases/#{@release2.version}.json", {}, headers
            expect(response.status).to eq(200)
            expect(response.json.cs.foo.bar).to eq('Released2')
            expect(response.json.cs.bar.foo).to eq('Translation')
          end
        end

        context 'dirrefent locales in one release' do
          it 'returns valid json for version 2', action: false do
            get "/api/v1/releases/#{@release2.version},#{@release_en.version}.json", {}, headers
            expect(response.status).to eq(200)
            expect(response.json.cs.foo.bar).to eq('Released2')
            expect(response.json.cs.bar.foo).to eq('Translation')
            expect(response.json.en.foo.bar).to eq('Translated')
          end
        end

        context 'latest release for locale' do
          it 'returns valid json for version 2', action: false do
            get "/api/v1/releases/#{@release2_en.locale.code}_latest", {}, headers
            expect(response.status).to eq(200)
            expect(response.json.en.foo.bar).to eq('Latest release')
          end
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
