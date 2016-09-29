require 'rails_helper'

RSpec.describe Project, type: :model do
  it { should have_many :locales }
  it { should have_one  :default_locale }
  it { should have_many :keys }
  it { should have_many :locations }
  it { should have_many :translations }
  it { should have_many :releases }
  it { should have_many :highlights }
  it { should have_many :images }
  it { should have_and_belong_to_many :users }
  it { should validate_uniqueness_of :api_token }
  it { should validate_uniqueness_of :name }
  it { should validate_length_of(:name).is_at_least(3) }

  describe '#api_token' do
    it 'should be nil when not created' do
      expect(Project.new.api_token).to be_nil
    end

    it 'saved project should have api_token' do
      expect(create(:project).api_token).not_to be_nil
    end

    it 'projects api_tokens are uniq!' do
      expect(create(:project).api_token).not_to eq(create(:project).api_token)
    end
  end
end
