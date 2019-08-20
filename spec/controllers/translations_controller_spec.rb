require 'rails_helper'

RSpec.describe TranslationsController, type: :controller do

  let(:key)    { create :key, project: project }
  let(:locale) { create :locale, project: project }

  let(:valid_attributes) do
    attributes_for :translation, locale_id: locale.id, key_id: key.id
  end

  let(:invalid_attributes) { valid_attributes.merge('key_id' => nil) }

  let(:user)    { create(:user, :with_project) }
  let(:project) { user.projects.first }
  before        { sign_in user }

  describe 'GET #index' do
    it 'assigns all translations as @translations' do
      translation = Translation.create! valid_attributes
      get :index, params: { project_id: project }
      expect(assigns(:translations)).to eq([translation])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested translation as @translation' do
      translation = Translation.create! valid_attributes
      get :show, params: { id: translation.to_param }
      expect(assigns(:translation)).to eq(translation)
    end
  end

  describe 'GET #new' do
    it 'assigns a new translation as @translation' do
      get :new, params: { project_id: project }
      expect(assigns(:translation)).to be_a_new(Translation)
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested translation as @translation' do
      translation = Translation.create! valid_attributes
      get :edit, params: { id: translation.to_param }
      expect(assigns(:translation)).to eq(translation)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Translation' do
        expect {
          post :create, params: { project_id: project, translation: valid_attributes }
        }.to change(Translation, :count).by(1)
      end

      it 'assigns a newly created translation as @translation' do
        post :create, params: { project_id: project, translation: valid_attributes }
        expect(assigns(:translation)).to be_a(Translation)
        expect(assigns(:translation)).to be_persisted
      end

      it 'redirects to the created translation' do
        post :create, params: { project_id: project, translation: valid_attributes }
        expect(response).to redirect_to([project, :translations])
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved translation as @translation' do
        post :create, params: { project_id: project, translation: invalid_attributes }
        expect(assigns(:translation)).to be_a_new(Translation)
      end

      it 're-renders the new template' do
        post :create, params: { project_id: project, translation: invalid_attributes }
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { text: 'updated text' } }

      it 'updates the requested translation' do
        translation = Translation.create! valid_attributes
        put :update, params: { id: translation.to_param, translation: new_attributes }
        translation.reload
        expect(translation.text).to eq('updated text')
      end

      it 'assigns the requested translation as @translation' do
        translation = Translation.create! valid_attributes
        put :update, params: { id: translation.to_param, translation: valid_attributes }
        expect(assigns(:translation)).to eq(translation)
      end

      it 'redirects to the translation' do
        translation = Translation.create! valid_attributes
        put :update, params: { id: translation.to_param, translation: valid_attributes }
        expect(response).to redirect_to(translation)
      end
    end

    context 'with invalid params' do
      it 'assigns the translation as @translation' do
        translation = Translation.create! valid_attributes
        put :update, params: { id: translation.to_param, translation: invalid_attributes }
        expect(assigns(:translation)).to eq(translation)
      end

      it 're-renders the edit template' do
        translation = Translation.create! valid_attributes
        put :update, params: { id: translation.to_param, translation: invalid_attributes }
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested translation' do
      translation = Translation.create! valid_attributes
      expect {
        delete :destroy, params: { id: translation.to_param }
      }.to change(Translation, :count).by(-1)
    end

    it 'redirects to the translations list' do
      translation = Translation.create! valid_attributes
      delete :destroy, params: { id: translation.to_param }
      expect(response).to redirect_to([project, :translations])
    end
  end

end
