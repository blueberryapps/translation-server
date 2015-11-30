require 'rails_helper'

RSpec.describe TranslationCache, type: :model do
  before do
    TranslationCache.delete_all
  end

  describe '.find_cache' do
    let(:result) { TranslationCache.find_cache(kind: kind, etag: etag) }
    let(:etag)   { [] }
    let(:kind)   { nil }

    context 'there is no cache' do
      it 'returns nil' do
        expect(result).to eq(nil)
      end
    end

    context 'cache has different etag' do
      before { TranslationCache.cache(kind: 'json', etag: ['X'], cache: 'XXX') }

      let(:kind) { 'JSON' }
      let(:etag) { ['Y'] }

      it 'returns nil ' do
        expect(result).to eq(nil)
      end
    end

    context 'cache has different kind' do
      before { TranslationCache.cache(kind: 'json', etag: ['X'], cache: 'XXX') }

      let(:kind) { 'yaml' }
      let(:etag) { ['X'] }

      it 'returns nil' do
        expect(result).to eq(nil)
      end
    end

    context 'cached kind and etag' do
      before { TranslationCache.cache(kind: 'json', etag: ['X'], cache: 'YYY') }

      let(:kind) { 'json' }
      let(:etag) { ['X'] }

      it 'returns cache instance' do
        expect(result).to be_kind_of(TranslationCache)
      end

      it 'returns cache data' do
        expect(result.cache).to eq('YYY')
      end
    end
  end
end
