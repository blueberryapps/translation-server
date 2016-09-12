require 'rails_helper'

RSpec.describe LocalesController, type: :controller do

  let(:valid_attributes)   { attributes_for :locale, project_id: project.id }
  let(:invalid_attributes) { { code: '' } }

  let(:user)    { create(:user, :with_project) }
  let(:project) { user.projects.first }
  before        { sign_in user }

  describe 'GET #index' do
    it 'assigns all locales as @locales' do
      locale = Locale.create! valid_attributes
      get :index, project_id: project
      expect(assigns(:locales)).to eq([locale])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested locale as @locale' do
      locale = Locale.create! valid_attributes
      get :show, id: locale.to_param
      expect(assigns(:locale)).to eq(locale)
    end
  end

  describe 'GET #new' do
    it 'assigns a new locale as @locale' do
      get :new, project_id: project
      expect(assigns(:locale)).to be_a_new(Locale)
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested locale as @locale' do
      locale = Locale.create! valid_attributes
      get :edit, id: locale.to_param
      expect(assigns(:locale)).to eq(locale)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Locale' do
        expect {
          post :create, project_id: project, locale: valid_attributes
        }.to change(Locale, :count).by(1)
      end

      it 'assigns a newly created locale as @locale' do
        post :create, project_id: project, locale: valid_attributes
        expect(assigns(:locale)).to be_a(Locale)
        expect(assigns(:locale)).to be_persisted
      end

      it 'redirects to the created locale' do
        post :create, project_id: project, locale: valid_attributes
        expect(response).to redirect_to(Locale.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved locale as @locale' do
        post :create, project_id: project, locale: invalid_attributes
        expect(assigns(:locale)).to be_a_new(Locale)
      end

      it 're-renders the new template' do
        post :create, project_id: project, locale: invalid_attributes
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { code: 'cs' } }

      it 'updates the requested locale' do
        locale = Locale.create! valid_attributes
        put :update, id: locale.to_param, locale: new_attributes
        locale.reload
        expect(locale.code).to eq('cs')
      end

      it 'assigns the requested locale as @locale' do
        locale = Locale.create! valid_attributes
        put :update, id: locale.to_param, locale: valid_attributes
        expect(assigns(:locale)).to eq(locale)
      end

      it 'redirects to the locale' do
        locale = Locale.create! valid_attributes
        put :update, id: locale.to_param, locale: valid_attributes
        expect(response).to redirect_to(locale)
      end
    end

    context 'with invalid params' do
      it 'assigns the locale as @locale' do
        locale = Locale.create! valid_attributes
        put :update, id: locale.to_param, locale: invalid_attributes
        expect(assigns(:locale)).to eq(locale)
      end

      it 're-renders the edit template' do
        locale = Locale.create! valid_attributes
        put :update, id: locale.to_param, locale: invalid_attributes
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested locale' do
      locale = Locale.create! valid_attributes
      expect {
        delete :destroy, id: locale.to_param
      }.to change(Locale, :count).by(-1)
    end

    it 'redirects to the locales list' do
      locale = Locale.create! valid_attributes
      delete :destroy, id: locale.to_param
      expect(response).to redirect_to([project, :locales])
    end
  end

end
