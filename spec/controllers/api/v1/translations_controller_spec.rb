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

  let(:api_user) { create :user, id: 5, api_key: 'XYZZYX' }

  before do
    @request.env["HTTP_AUTHORIZATION"] = "Token token=#{api_user.api_key}"
  end

  describe 'POST #create' do
    context 'with valid params' do
      action do
        post :create, attributes
      end

      it 'rep' do
        expect(response.status).to eq(200)
      end

      it 'creates a new Translations', action: false do
        expect {
          post :create, attributes
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
