require 'rails_helper'

RSpec.describe TranslatesController, type: :controller do
  let!(:locale) { create :locale }

  describe 'GET #index' do
    it 'returns http success' do
      get :index, locale_code: locale.code
      expect(response).to have_http_status(:success)
    end
  end
end
