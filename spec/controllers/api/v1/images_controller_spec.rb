require 'rails_helper'

RSpec.describe API::V1::ImagesController, type: :controller do

  let(:attributes) do
    {
      location: 'foo/bar',
      locale:   'cs',
      images: [
        {
          key:    'foo.bar',
          image:  'XYZ',
          x:      10,
          y:      20,
          width:  30,
          height: 40
        }
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

      it 'creates a new Image', action: false do
        expect {
          post :create, attributes
        }.to change(Image, :count).by(1)
      end

      it 'creates locale' do
        expect(Locale.where(code: 'cs').size).to eq(1)
      end

      it 'creates key' do
        expect(Key.where(key: 'foo.bar').size).to eq(1)
      end

      it 'creates location' do
        expect(Location.where(path: 'foo/bar').size).to eq(1)
      end
    end
  end
end
