require 'rails_helper'

RSpec.describe Image, type: :model do
  it { is_expected.to belong_to :location }
  it { is_expected.to have_many :highlights }
  it { is_expected.to have_one  :project }
end
