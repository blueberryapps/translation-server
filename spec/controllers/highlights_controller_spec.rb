require 'rails_helper'

RSpec.describe HighlightsController, type: :controller do

  let(:location) { create :location }
  let(:image)    { create :image, location: location }
  let(:key)      { create :key }

  let(:valid_attributes) do
    attributes_for :highlight, image_id: image.id, key_id: key.id
  end

  let(:invalid_attributes) { valid_attributes.merge('image_id' => nil) }

  let(:user) { create(:user) }
  before     { sign_in user }

  describe "GET #index" do
    it "assigns all highlights as @highlights" do
      highlight = Highlight.create! valid_attributes
      get :index, {}
      expect(assigns(:highlights)).to eq([highlight])
    end
  end

  describe "GET #show" do
    it "assigns the requested highlight as @highlight" do
      highlight = Highlight.create! valid_attributes
      get :show, {:id => highlight.to_param}
      expect(assigns(:highlight)).to eq(highlight)
    end
  end

  describe "GET #new" do
    it "assigns a new highlight as @highlight" do
      get :new, {}
      expect(assigns(:highlight)).to be_a_new(Highlight)
    end
  end

  describe "GET #edit" do
    it "assigns the requested highlight as @highlight" do
      highlight = Highlight.create! valid_attributes
      get :edit, {:id => highlight.to_param}
      expect(assigns(:highlight)).to eq(highlight)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Highlight" do
        expect {
          post :create, {:highlight => valid_attributes}
        }.to change(Highlight, :count).by(1)
      end

      it "assigns a newly created highlight as @highlight" do
        post :create, {:highlight => valid_attributes}
        expect(assigns(:highlight)).to be_a(Highlight)
        expect(assigns(:highlight)).to be_persisted
      end

      it "redirects to the created highlight" do
        post :create, {:highlight => valid_attributes}
        expect(response).to redirect_to(Highlight.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved highlight as @highlight" do
        post :create, {:highlight => invalid_attributes}
        expect(assigns(:highlight)).to be_a_new(Highlight)
      end

      it "re-renders the 'new' template" do
        post :create, {:highlight => invalid_attributes}
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) { { x: 123 } }

      it "updates the requested highlight" do
        highlight = Highlight.create! valid_attributes
        put :update, {:id => highlight.to_param, :highlight => new_attributes}
        highlight.reload
        expect(highlight.x).to eq 123
      end

      it "assigns the requested highlight as @highlight" do
        highlight = Highlight.create! valid_attributes
        put :update, {:id => highlight.to_param, :highlight => valid_attributes}
        expect(assigns(:highlight)).to eq(highlight)
      end

      it "redirects to the highlight" do
        highlight = Highlight.create! valid_attributes
        put :update, {:id => highlight.to_param, :highlight => valid_attributes}
        expect(response).to redirect_to(highlight)
      end
    end

    context "with invalid params" do
      it "assigns the highlight as @highlight" do
        highlight = Highlight.create! valid_attributes
        put :update, {:id => highlight.to_param, :highlight => invalid_attributes}
        expect(assigns(:highlight)).to eq(highlight)
      end

      it "re-renders the 'edit' template" do
        highlight = Highlight.create! valid_attributes
        put :update, {:id => highlight.to_param, :highlight => invalid_attributes}
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested highlight" do
      highlight = Highlight.create! valid_attributes
      expect {
        delete :destroy, {:id => highlight.to_param}
      }.to change(Highlight, :count).by(-1)
    end

    it "redirects to the highlights list" do
      highlight = Highlight.create! valid_attributes
      delete :destroy, {:id => highlight.to_param}
      expect(response).to redirect_to(highlights_url)
    end
  end

end
