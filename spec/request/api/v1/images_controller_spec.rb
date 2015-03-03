require 'rails_helper'

module API
  module V1
    describe 'Images API Requests', type: :request do
      describe 'POST /api/v1/images' do
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

        it 'responds with success' do
          expect {
            post '/api/v1/images', attributes.to_json, 'CONTENT_TYPE' => 'application/json'
          }.to change(Image, :count).by(1)

          expect(response.status).to eq 200
          expect(response.json.message).to eq 'Imported 1 images'
        end
      end
    end
  end
end
