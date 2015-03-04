require 'rails_helper'

RSpec.describe Highlight, type: :model do
  it { should belong_to :image }
  it { should belong_to :key }

end
