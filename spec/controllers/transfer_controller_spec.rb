require 'rails_helper'

RSpec.describe TransferController, type: :controller do

  let(:user)    { create :user, role: 'admin' }
  before        { sign_in user }

  describe 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end

    context 'normal user' do
      let(:user) { create :user, role: 'user' }

      it 'redirects to root' do
        get :index
        expect(response).to redirect_to(:root)
      end
    end
  end

  describe 'POST #create' do
    let(:data) do
      { url: 'http://some.cz', locales: 'cs', api_token: 'XYZ', project_name: 'Super' }
    end

    before do
      allow(ProjectTransfer).to receive(:new).and_call_original
      allow_any_instance_of(ProjectTransfer)
        .to receive(:execute).and_return(true)
    end

    action do
      post :create, project_transfer: data
    end

    it 'returns redirects to transer root' do
      expect(response).to redirect_to(:transfer)
    end

    it 'runs fransfer command' do
      expect(ProjectTransfer).to have_received(:new).with(data)
    end
  end
end
