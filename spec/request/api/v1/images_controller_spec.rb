require 'rails_helper'

module API
  module V1
    describe 'Images API Requests', type: :request do
      describe 'POST /api/v1/images' do

        let(:api_user) { create :user, id: 5, api_key: 'XYZZYX' }

        let(:headers) do
          {
            'HTTP_AUTHORIZATION' => "Token token=#{api_user.api_key}",
            'CONTENT_TYPE' => 'application/json'
          }
        end

        let(:attributes) do
          {
            location: '/foo/bar',
            locale:   'cs',
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

        it 'responds with success' do
          expect {
            post '/api/v1/images', attributes.to_json, headers
          }.to change(Image, :count).by(1)

          expect(response.status).to eq 200
          expect(response.json.message)
            .to eq 'Imported 1 images and 1 highlights'
        end
      end
    end
  end
end
