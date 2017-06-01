require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_uniqueness_of(:email) }
  it { should have_and_belong_to_many :projects }
  it { should have_many :translations }
  it { should have_many :releases }
end
