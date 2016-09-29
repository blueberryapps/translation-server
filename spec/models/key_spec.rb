require 'rails_helper'

RSpec.describe Key, type: :model do
  it { should belong_to :project }
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

    context 'with valid name' do
      specify { expect(Key.new(key: 'foo.bar').valid?).to eq(true) }
      specify { expect(Key.new(key: 'foo-bar').valid?).to eq(true) }
      specify { expect(Key.new(key: 'foo_bar').valid?).to eq(true) }
      specify { expect(Key.new(key: 'foo_bar1').valid?).to eq(true) }
      specify { expect(Key.new(key: 'Foo_bar').valid?).to eq(true) }
    end

    context 'with invalid name' do
      specify { expect(Key.new(key: 'foo(bar').valid?).to eq(false) }
      specify { expect(Key.new(key: 'foo)bar').valid?).to eq(false) }
      specify { expect(Key.new(key: 'foo{bar').valid?).to eq(false) }
      specify { expect(Key.new(key: 'foo}bar').valid?).to eq(false) }
      specify { expect(Key.new(key: 'foo]bar').valid?).to eq(false) }
      specify { expect(Key.new(key: 'foo[bar').valid?).to eq(false) }
      specify { expect(Key.new(key: 'foo.').valid?).to eq(false) }
      specify { expect(Key.new(key: '.').valid?).to eq(false) }
      specify { expect(Key.new(key: '.foo').valid?).to eq(false) }
      specify { expect(Key.new(key: 'foo..bar').valid?).to eq(false) }
    end
  end

  describe '#normalize_value' do
    let(:key)    { Key.new key: 'key', data_type: data_type }
    let(:result) { key.normalize_value(value) }

    context 'array' do
      let(:data_type) { 'array' }
      let(:value)     { "- a\n- b" }

      specify { expect(result).to eq(%w(a b))}
    end

    context 'integer' do
      let(:data_type) { 'integer' }
      let(:value)     { ' 243 ' }

      specify { expect(result).to eq(243)}
    end

    context 'float' do
      let(:data_type) { 'float' }
      let(:value)     { '434.23' }

      specify { expect(result).to eq(434.23)}
    end

    context 'string' do
      let(:data_type) { 'string' }
      let(:value)     { "Foo \r Bar \n\r" }

      specify { expect(result).to eq("Foo \n Bar \n")}
    end

    context 'symbol' do
      let(:data_type) { 'symbol' }
      let(:value)     { 'foo' }

      specify { expect(result).to eq(:foo)}
    end

    context 'boolean' do
      let(:data_type) { 'boolean' }
      let(:value)     { 'true' }

      specify { expect(result).to eq(true)}
    end
  end
end
