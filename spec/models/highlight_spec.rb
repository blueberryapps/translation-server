require 'rails_helper'

RSpec.describe Highlight, type: :model do
  it { should belong_to :image }
  it { should belong_to :key }
  it { should belong_to :locale }
  it { should belong_to :location }
  it { should have_one :project }

end
