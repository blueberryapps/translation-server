require 'rails_helper'

RSpec.describe Location, type: :model do
  it { is_expected.to have_many :images }
  it { is_expected.to have_many :highlights }
  it { is_expected.to belong_to :project }
end
