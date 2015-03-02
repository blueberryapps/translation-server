require 'rails_helper'

RSpec.describe ImagesController, type: :controller do

  let(:key)      { create :key }
  let(:location) { create :location }

  let(:valid_attributes) do
    attributes_for :image, location_id: location.id, key_id: key.id
  end

  let(:invalid_attributes) { valid_attributes.merge('location_id' => nil) }

  let(:user) { create(:user) }
  before     { sign_in user }

  describe 'GET #index' do
    it 'assigns all images as @images' do
      image = Image.create! valid_attributes
      get :index, {}
      expect(assigns(:images)).to eq([image])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested image as @image' do
      image = Image.create! valid_attributes
      get :show, {:id => image.to_param}
      expect(assigns(:image)).to eq(image)
    end
  end

  describe 'GET #new' do
    it 'assigns a new image as @image' do
      get :new, {}
      expect(assigns(:image)).to be_a_new(Image)
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested image as @image' do
      image = Image.create! valid_attributes
      get :edit, {:id => image.to_param}
      expect(assigns(:image)).to eq(image)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Image' do
        expect {
          post :create, {:image => valid_attributes}
        }.to change(Image, :count).by(1)
      end

      it 'assigns a newly created image as @image' do
        post :create, {:image => valid_attributes}
        expect(assigns(:image)).to be_a(Image)
        expect(assigns(:image)).to be_persisted
      end

      it 'redirects to the created image' do
        post :create, {:image => valid_attributes}
        expect(response).to redirect_to(Image.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved image as @image' do
        post :create, {:image => invalid_attributes}
        expect(assigns(:image)).to be_a_new(Image)
      end

      it 're-renders the new template' do
        post :create, {:image => invalid_attributes}
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { x: 20 } }

      it 'updates the requested image' do
        image = Image.create! valid_attributes
        put :update, {:id => image.to_param, :image => new_attributes}
        image.reload
        expect(image.x).to eq(20)
      end

      it 'assigns the requested image as @image' do
        image = Image.create! valid_attributes
        put :update, {:id => image.to_param, :image => valid_attributes}
        expect(assigns(:image)).to eq(image)
      end

      it 'redirects to the image' do
        image = Image.create! valid_attributes
        put :update, {:id => image.to_param, :image => valid_attributes}
        expect(response).to redirect_to(image)
      end
    end

    context 'with invalid params' do
      it 'assigns the image as @image' do
        image = Image.create! valid_attributes
        put :update, {:id => image.to_param, :image => invalid_attributes}
        expect(assigns(:image)).to eq(image)
      end

      it 're-renders the edit template' do
        image = Image.create! valid_attributes
        put :update, {:id => image.to_param, :image => invalid_attributes}
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested image' do
      image = Image.create! valid_attributes
      expect {
        delete :destroy, {:id => image.to_param}
      }.to change(Image, :count).by(-1)
    end

    it 'redirects to the images list' do
      image = Image.create! valid_attributes
      delete :destroy, {:id => image.to_param}
      expect(response).to redirect_to(images_url)
    end
  end

end
