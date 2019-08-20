require 'rails_helper'

RSpec.describe ReleasesController, type: :controller do
  let(:locale)             { Locale.resolve(code: 'cs', project: project) }
  let(:valid_attributes)   { attributes_for :release, locale_id: locale.id }

  let(:user)    { create(:user, :with_project) }
  let(:project) { user.projects.first }
  before        { sign_in user }

  describe "GET #index" do
    it "assigns all releases as @releases" do
      release = Release.create! valid_attributes
      get :index, params: { project_id: project }
      expect(assigns(:releases)).to eq([release])
    end
  end

  describe "GET #show" do
    it "assigns the requested release as @release" do
      release = Release.create! valid_attributes
      get :show, params: { id: release.to_param }
      expect(assigns(:release)).to eq(release)
    end
  end

  describe "GET #new" do
    it "assigns a new release as @release" do
      get :new, params: { project_id: project }
      expect(assigns(:release)).to be_a_new(Release)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Release" do
        expect {
          post :create, params: { project_id: project, release: valid_attributes }
        }.to change(Release, :count).by(1)
      end

      it "assigns a newly created release as @release" do
        post :create, params: { project_id: project, release: valid_attributes }
        expect(assigns(:release)).to be_a(Release)
        expect(assigns(:release)).to be_persisted
      end

      it "redirects to the created release" do
        post :create, params: { project_id: project, release: valid_attributes }
        expect(response).to redirect_to(Release.last)
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested release" do
      release = Release.create! valid_attributes
      expect {
        delete :destroy, params: { id: release.to_param }
      }.to change(Release, :count).by(-1)
    end

    it "redirects to the releases list" do
      release = Release.create! valid_attributes
      delete :destroy, params: { id: release.to_param }
      expect(response).to redirect_to([project, :releases])
    end
  end
end
