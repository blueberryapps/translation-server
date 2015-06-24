require 'rails_helper'

RSpec.describe ReleasesController, type: :controller do
  let(:locale)             { Locale.resolve(code: 'cs') }
  let(:valid_attributes)   { attributes_for :release, locale_id: locale.id }
  let(:invalid_attributes) { { locale: '' } }

  let(:user) { create(:user) }
  before     { sign_in user }

  describe "GET #index" do
    it "assigns all releases as @releases" do
      release = Release.create! valid_attributes
      get :index, {}
      expect(assigns(:releases)).to eq([release])
    end
  end

  describe "GET #show" do
    it "assigns the requested release as @release" do
      release = Release.create! valid_attributes
      get :show, { id: release.to_param }
      expect(assigns(:release)).to eq(release)
    end
  end

  describe "GET #new" do
    it "assigns a new release as @release" do
      get :new, {}
      expect(assigns(:release)).to be_a_new(Release)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Release" do
        expect {
          post :create, { release: valid_attributes }
        }.to change(Release, :count).by(1)
      end

      it "assigns a newly created release as @release" do
        post :create, { release: valid_attributes }
        expect(assigns(:release)).to be_a(Release)
        expect(assigns(:release)).to be_persisted
      end

      it "redirects to the created release" do
        post :create, { release: valid_attributes }
        expect(response).to redirect_to(Release.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved release as @release" do
        post :create, { release: invalid_attributes }
        expect(assigns(:release)).to be_a_new(Release)
      end

      it "re-renders the 'new' template" do
        post :create, {:release => invalid_attributes}
        expect(response).to render_template("new")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested release" do
      release = Release.create! valid_attributes
      expect {
        delete :destroy, { id: release.to_param }
      }.to change(Release, :count).by(-1)
    end

    it "redirects to the releases list" do
      release = Release.create! valid_attributes
      delete :destroy, { id: release.to_param }
      expect(response).to redirect_to(releases_url)
    end
  end
end
