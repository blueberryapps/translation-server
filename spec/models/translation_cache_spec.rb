require 'rails_helper'

RSpec.describe TranslationCache, type: :model do
  it { is_expected.to belong_to :project }
end
