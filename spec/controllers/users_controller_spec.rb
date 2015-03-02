require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  let(:valid_attributes)   { attributes_for :user }
  let(:invalid_attributes) { { email: '' } }

  let(:user) { create(:user) }
  before     { sign_in user }

  describe 'GET #index' do
    it 'assigns all users as @users' do
      new_user = User.create! valid_attributes
      get :index, {}
      expect(assigns(:users)).to eq([user, new_user])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested user as @user' do
      user = User.create! valid_attributes
      get :show, {:id => user.to_param}
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'GET #new' do
    it 'assigns a new user as @user' do
      get :new, {}
      expect(assigns(:user)).to be_a_new(User)
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested user as @user' do
      user = User.create! valid_attributes
      get :edit, {:id => user.to_param}
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new User' do
        expect {
          post :create, {:user => valid_attributes}
        }.to change(User, :count).by(1)
      end

      it 'assigns a newly created user as @user' do
        post :create, {:user => valid_attributes}
        expect(assigns(:user)).to be_a(User)
        expect(assigns(:user)).to be_persisted
      end

      it 'redirects to the created user' do
        post :create, {:user => valid_attributes}
        expect(response).to redirect_to(User.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved user as @user' do
        post :create, {:user => invalid_attributes}
        expect(assigns(:user)).to be_a_new(User)
      end

      it 're-renders the new template' do
        post :create, {:user => invalid_attributes}
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { email: 'super@email.com' } }

      it 'updates the requested user' do
        user = User.create! valid_attributes
        put :update, {:id => user.to_param, :user => new_attributes}
        user.reload
        expect(user.email).to eq('super@email.com')
      end

      it 'assigns the requested user as @user' do
        user = User.create! valid_attributes
        put :update, {:id => user.to_param, :user => valid_attributes}
        expect(assigns(:user)).to eq(user)
      end

      it 'redirects to the user' do
        user = User.create! valid_attributes
        put :update, {:id => user.to_param, :user => valid_attributes}
        expect(response).to redirect_to(user)
      end
    end

    context 'with invalid params' do
      it 'assigns the user as @user' do
        user = User.create! valid_attributes
        put :update, {:id => user.to_param, :user => invalid_attributes}
        expect(assigns(:user)).to eq(user)
      end

      it 're-renders the edit template' do
        user = User.create! valid_attributes
        put :update, {:id => user.to_param, :user => invalid_attributes}
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested user' do
      user = User.create! valid_attributes
      expect {
        delete :destroy, {:id => user.to_param}
      }.to change(User, :count).by(-1)
    end

    it 'redirects to the users list' do
      user = User.create! valid_attributes
      delete :destroy, {:id => user.to_param}
      expect(response).to redirect_to(users_url)
    end
  end

end
