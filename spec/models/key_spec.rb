require 'rails_helper'

RSpec.describe Key, type: :model do
  it { should have_many :translations }
  it { should have_many :highlights }
end
