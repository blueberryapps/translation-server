require 'rails_helper'

RSpec.describe Location, type: :model do
  it { should have_many :images }
  it { should have_many :highlights }
  it { should belong_to :project }
end
