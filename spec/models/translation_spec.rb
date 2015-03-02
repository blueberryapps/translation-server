require 'rails_helper'

RSpec.describe Translation, type: :model do
  it { should belong_to :locale }
  it { should belong_to :key }
end
