require 'rails_helper'

RSpec.describe Project, type: :model do
  it { is_expected.to have_many :locales }
  it { is_expected.to have_one  :default_locale }
  it { is_expected.to have_many :keys }
  it { is_expected.to have_many :locations }
  it { is_expected.to have_many :translations }
  it { is_expected.to have_many :releases }
  it { is_expected.to have_many :highlights }
  it { is_expected.to have_many :images }
  it { is_expected.to have_and_belong_to_many :users }
  it { is_expected.to validate_uniqueness_of :api_token }
  it { is_expected.to validate_uniqueness_of :name }
  it { is_expected.to validate_length_of(:name).is_at_least(3) }

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
