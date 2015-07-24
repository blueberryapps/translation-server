require 'rails_helper'

RSpec.describe ImportsController, type: :controller do
  let(:user) { create(:user) }
  before     { sign_in user }

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
end
