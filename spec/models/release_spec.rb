require 'rails_helper'

RSpec.describe Release, type: :model do
  let(:locale) { Locale.resolve code: 'cs' }
  let(:key)    { Key.resolve key: 'foo.bar' }

  before do
    Translation.resolve({ locale: locale, key: key }, { text: 'foo' }).save
  end

  it { should belong_to :locale }

  describe '#version' do
    let(:release) { Release.create(locale: locale) }

    context 'first version' do
      it 'returns right first version' do
        expect(release.version).to eq('cs_v001')
      end
    end

    context 'second version' do
      it 'returns right second version' do
        Release.create(locale: locale)
        expect(release.version).to eq('cs_v002')
      end
    end
  end

  describe '#yaml' do
    let(:release) { Release.create(locale: locale) }

    it 'returns yaml with all translations for given locale' do
      expect(release.yaml).to eq("---\ncs:\n  foo:\n    bar: foo\n")
    end
  end
end
