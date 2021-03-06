require 'rails_helper'

RSpec.describe KeysController, type: :controller do

  let(:valid_attributes)   { attributes_for :key, project_id: project.id }
  let(:invalid_attributes) { { key: '' } }

  let(:user)    { create(:user, :with_project) }
  let(:project) { user.projects.first }
  before        { sign_in user }


  describe 'GET #index' do
    it 'assigns all keys as @keys' do
      key = Key.create! valid_attributes
      get :index, params: { project_id: project }
      expect(assigns(:keys)).to eq([key])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested key as @key' do
      key = Key.create! valid_attributes
      get :show, params: { id: key.to_param }
      expect(assigns(:key)).to eq(key)
    end
  end

  describe 'GET #new' do
    it 'assigns a new key as @key' do
      get :new, params: { project_id: project }
      expect(assigns(:key)).to be_a_new(Key)
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested key as @key' do
      key = Key.create! valid_attributes
      get :edit, params: { id: key.to_param }
      expect(assigns(:key)).to eq(key)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Key' do
        expect {
          post :create, params: { project_id: project, key: valid_attributes }
        }.to change(Key, :count).by(1)
      end

      it 'assigns a newly created key as @key' do
        post :create, params: { project_id: project, key: valid_attributes }
        expect(assigns(:key)).to be_a(Key)
        expect(assigns(:key)).to be_persisted
      end

      it 'redirects to the created key' do
        post :create, params: { project_id: project, key: valid_attributes }
        expect(response).to redirect_to(Key.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved key as @key' do
        post :create, params: { project_id: project, key: invalid_attributes }
        expect(assigns(:key)).to be_a_new(Key)
      end

      it 're-renders the new template' do
        post :create, params: { project_id: project, key: invalid_attributes }
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { key: 'updated_key' } }

      it 'updates the requested key' do
        key = Key.create! valid_attributes
        put :update, params: { id: key.to_param, key: new_attributes }
        key.reload
        expect(key.key).to eq('updated_key')
      end

      it 'assigns the requested key as @key' do
        key = Key.create! valid_attributes
        put :update, params: { id: key.to_param, key: valid_attributes }
        expect(assigns(:key)).to eq(key)
      end

      it 'redirects to the key' do
        key = Key.create! valid_attributes
        put :update, params: { id: key.to_param, key: valid_attributes }
        expect(response).to redirect_to(key)
      end
    end

    context 'with invalid params' do
      it 'assigns the key as @key' do
        key = Key.create! valid_attributes
        put :update, params: { id: key.to_param, key: invalid_attributes }
        expect(assigns(:key)).to eq(key)
      end

      it 're-renders the edit template' do
        key = Key.create! valid_attributes
        put :update, params: { id: key.to_param, key: invalid_attributes }
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested key' do
      key = Key.create! valid_attributes
      expect {
        delete :destroy, params: { id: key.to_param }
      }.to change(Key, :count).by(-1)
    end

    it 'redirects to the keys list' do
      key = Key.create! valid_attributes
      delete :destroy, params: { id: key.to_param }
      expect(response).to redirect_to([project, :keys])
    end
  end

end
