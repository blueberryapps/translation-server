require 'rails_helper'

RSpec.describe API::V2::TransferController, type: :controller do
  let(:response_body) { JSON.parse(response.body).deep_symbolize_keys }
  let(:locale_codes) { 'en' }
  let!(:project) { create :project, id: 5, api_token: 'XYZZYX' }
  let!(:locale_cs) { create :locale, code: 'cs', project: project }
  let!(:locale_en) { create :locale, code: 'en', project: project }
  let!(:key) { create :key, key: 'foo.bar', project: project }
  let!(:translation_en) { create :translation, key: key, text: 'hello', locale: locale_en }
  let!(:translation_cs) { create :translation, key: key, text: 'ahoj', locale: locale_cs }
  let!(:image) { create :image, name: 'image', variant: 'base', image: 'PNGGGGGG', location: location }
  let!(:location) { create :location, path: '/foo', project: project }
  let!(:highlight) { create :highlight, x: 1, y: 2, width: 10, height: 20, key: key, locale: locale_en, image: image }
  let!(:release_en) { create :release, project: project, locale: locale_en, yaml: '---YAML' }
  let!(:release_cs) { create :release, project: project, locale: locale_cs, yaml: '---DIFFERENT YAML' }

  describe 'GET #index' do
    context 'without authorization' do
      action do
        get :index, token: 'INVALID', locale_codes: locale_codes
      end

      it 'response 401' do
        expect(response.status).to eq(401)
      end
    end

    context 'with authorization' do
      action do
        get :index, token: project.api_token, locale_codes: locale_codes
      end

      it 'response 200' do
        expect(response.status).to eq(200)
      end

      it 'returns complete data structure of locale' do
        expect(response_body).to eq({
          en: {
            translations: {
              'foo.bar': 'hello'
            },
            locations: {
              '/foo': [
                {
                  name: 'image',
                  variant: 'base',
                  image: 'PNGGGGGG',
                  highlights: [
                    {
                      x: 1,
                      y: 2,
                      width: 10,
                      height: 20,
                      key: 'foo.bar',
                    }
                  ]
                }
              ]
            },
            releases: {
              'en_v001': {
                created_at: release_en.created_at.to_s,
                yaml: '---YAML'
              }
            }
          }
        })
      end

      context 'multiple locales' do
        let(:locale_codes) { 'cs,en' }
        specify do
          expect(response_body.keys)
            .to eq([:cs, :en])
        end
      end

      context 'nonexisting locale' do
        let(:locale_codes) { 'cs,ro' }

        it 'response 404' do
          expect(response.status).to eq(404)
        end
      end
    end
  end
end
