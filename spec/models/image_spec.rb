require 'rails_helper'

RSpec.describe Image, type: :model do
  it { should belong_to :location }
  it { should have_many :highlights }
  it { should have_one  :project }
end
