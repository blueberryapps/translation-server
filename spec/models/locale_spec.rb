require 'rails_helper'

RSpec.describe Locale, type: :model do
  it { should have_many :translations }
  it { should have_many :releases }
end
