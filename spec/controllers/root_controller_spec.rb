require 'rails_helper'

RSpec.describe RootController, type: :controller do

  describe 'GET #is_alive' do
    it 'returns http success' do
      get :is_alive
      expect(response).to have_http_status(:success)
    end
  end
end
