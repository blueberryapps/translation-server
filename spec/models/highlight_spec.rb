require 'rails_helper'

RSpec.describe Highlight, type: :model do
  it { is_expected.to belong_to :image }
  it { is_expected.to belong_to :key }
  it { is_expected.to belong_to :locale }
  it { is_expected.to belong_to :location }
  it { is_expected.to have_one :project }

end
