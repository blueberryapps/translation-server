require 'rails_helper'

RSpec.describe API::V1::ImagesController, type: :controller do

  let(:attributes) do
    {
      location: '/foo/bar',
      images: [
        {
          image:  'XYZ',
          name:   '/foo/bar#modal'
        }
      ],
      highlights: [
        {
          image_name: '/foo/bar#modal',
          key:        'cs.foo.bar',
          x:          10,
          y:          20,
          width:      30,
          height:     40
        }
      ]
    }
  end

  let(:project) { create :project, id: 5, api_token: 'XYZZYX' }

  before do
    @request.env["HTTP_AUTHORIZATION"] = "Token token=#{project.api_token}"
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

      it 'creates key' do
        expect(Key.where(key: 'foo.bar').size).to eq(1)
      end

      it 'creates location' do
        expect(Location.where(path: '/foo/bar').size).to eq(1)
      end

      it 'creates Highlight' do
        image = Image.where(name: '/foo/bar#modal').first
        key   = Key.where(key: 'foo.bar').first
        expect(Highlight.where(image: image, key: key).size).to eq(1)
      end
    end
  end
end
