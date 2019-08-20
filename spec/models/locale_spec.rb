require 'rails_helper'

RSpec.describe Locale, type: :model do
  it { is_expected.to belong_to :project }
  it { is_expected.to have_many :translations }
  it { is_expected.to have_many :releases }

  describe '#valid?' do
    context 'with valid name' do
      specify { expect(Locale.new(code: 'foo_bar').valid?).to eq(true) }
      specify { expect(Locale.new(code: 'foo_bar').valid?).to eq(true) }
      specify { expect(Locale.new(code: 'foo-bar').valid?).to eq(true) }
      specify { expect(Locale.new(code: 'Foo_bar').valid?).to eq(true) }
      specify { expect(Locale.new(code: 'foo_bar1').valid?).to eq(true) }
    end

    context 'with invalid name' do
      specify { expect(Locale.new(code: 'foo(bar').valid?).to eq(false) }
      specify { expect(Locale.new(code: 'foo)bar').valid?).to eq(false) }
      specify { expect(Locale.new(code: 'foo{bar').valid?).to eq(false) }
      specify { expect(Locale.new(code: 'foo}bar').valid?).to eq(false) }
      specify { expect(Locale.new(code: 'foo]bar').valid?).to eq(false) }
      specify { expect(Locale.new(code: 'foo[bar').valid?).to eq(false) }
    end
  end
end
