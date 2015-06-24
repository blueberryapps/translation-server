require 'rails_helper'

RSpec.describe Key, type: :model do
  it { should have_many :translations }
  it { should have_many :highlights }

  let(:key) { Key.new key: 'super.key' }

  describe '#valid?' do
    context 'with uniq key' do
      specify { expect(key.valid?).to eq(true) }
    end

    context 'with already existing key' do
      before { Key.create key: 'super.key' }
      specify { expect(key.valid?).to eq(false) }
    end

    context 'with already existing sub key' do
      before { Key.create key: 'super.key.super' }
      specify { expect(key.valid?).to eq(false) }
    end

    context 'with already existing parent key' do
      before { Key.create key: 'super' }
      specify { expect(key.valid?).to eq(false) }
    end

    context 'with already existing parent key with childs' do
      before { Key.create key: 'super.cool' }
      specify { expect(key.valid?).to eq(true) }
    end
  end
end
