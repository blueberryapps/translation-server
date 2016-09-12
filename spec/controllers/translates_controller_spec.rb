require 'rails_helper'

RSpec.describe TranslatesController, type: :controller do
  let!(:locale) { create :locale, project: project }

  let(:user)    { create(:user, :with_project) }
  let(:project) { user.projects.first }
  before        { sign_in user }

  describe 'GET #index' do
    it 'returns http success' do
      get :index, project_id: project, locale_code: locale.code
      expect(response).to have_http_status(:success)
    end
  end
end
