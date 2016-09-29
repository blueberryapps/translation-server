require 'rails_helper'

RSpec.describe ImportsController, type: :controller do
  let(:user)    { create(:user, :with_project, role: 'admin') }
  let(:project) { user.projects.first }
  before        { sign_in user }

  describe "GET #index" do
    it "returns http success" do
      get :index, project_id: project
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    it "returns http success" do
      post :create, project_id: project, import_form: {text: "cs:\n  hi: hello\n"}
      expect(response).to have_http_status(:success)
      expect(assigns[:import].error)
        .to eq("ImportForm::ImportError User hasn't got permission to manage this locale.")
    end
  end
end
