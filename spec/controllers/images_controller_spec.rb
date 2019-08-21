require 'rails_helper'

RSpec.describe ImagesController, type: :controller do

  let(:location) { create :location, project: project }

  let(:valid_attributes) do
    attributes_for :image, location_id: location.id
  end

  let(:invalid_attributes) { valid_attributes.merge(name: nil) }

  let(:user)    { create(:user, :with_project) }
  let(:project) { user.projects.first }
  before        { sign_in user }

  describe 'GET #index' do
    it 'assigns all images as @images' do
      image = Image.create! valid_attributes
      get :index, params: { project_id: project }
      expect(assigns(:images)).to eq([image])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested image as @image' do
      image = Image.create! valid_attributes
      get :show, params: { id: image.to_param }
      expect(assigns(:image)).to eq(image)
    end
  end

  describe 'GET #new' do
    it 'assigns a new image as @image' do
      get :new, params: { project_id: project }
      expect(assigns(:image)).to be_a_new(Image)
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested image as @image' do
      image = Image.create! valid_attributes
      get :edit, params: { id: image.to_param }
      expect(assigns(:image)).to eq(image)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Image' do
        expect {
          post :create, params: { project_id: project, image: valid_attributes }
        }.to change(Image, :count).by(1)
      end

      it 'assigns a newly created image as @image' do
        post :create, params: { project_id: project, image: valid_attributes }
        expect(assigns(:image)).to be_a(Image)
        expect(assigns(:image)).to be_persisted
      end

      it 'redirects to the created image' do
        post :create, params: { project_id: project, image: valid_attributes }
        expect(response).to redirect_to(Image.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved image as @image' do
        post :create, params: { project_id: project, image: invalid_attributes }
        expect(assigns(:image)).to be_a_new(Image)
      end

      it 're-renders the new template' do
        post :create, params: { project_id: project, image: invalid_attributes }
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { name: 'testing name' } }

      it 'updates the requested image' do
        image = Image.create! valid_attributes
        put :update, params: { id: image.to_param, image: new_attributes }
        image.reload
        expect(image.name).to eq('testing name')
      end

      it 'assigns the requested image as @image' do
        image = Image.create! valid_attributes
        put :update, params: { id: image.to_param, image: valid_attributes }
        expect(assigns(:image)).to eq(image)
      end

      it 'redirects to the image' do
        image = Image.create! valid_attributes
        put :update, params: { id: image.to_param, image: valid_attributes }
        expect(response).to redirect_to(image)
      end
    end

    context 'with invalid params' do
      it 'assigns the image as @image' do
        image = Image.create! valid_attributes
        put :update, params: { id: image.to_param, image: invalid_attributes }
        expect(assigns(:image)).to eq(image)
      end

      it 're-renders the edit template' do
        image = Image.create! valid_attributes
        put :update, params: { id: image.to_param, image: invalid_attributes }
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested image' do
      image = Image.create! valid_attributes
      expect {
        delete :destroy, params: { id: image.to_param }
      }.to change(Image, :count).by(-1)
    end

    it 'redirects to the images list' do
      image = Image.create! valid_attributes
      delete :destroy, params: { id: image.to_param }
      expect(response).to redirect_to([project, :images])
    end
  end

end
