require 'digest'

class TranslationCache < ApplicationRecord

  def self.find_cache(kind:, etag:)
    find_by(kind: kind, etag: build_etag(etag))
  end

  def self.cache(kind:, etag:, cache:)
    if cached = find_by(kind: kind)
      cached.update(etag: build_etag(etag), cache: cache)
    else
      create(kind: kind, etag: build_etag(etag), cache: cache)
    end
  end

  def self.build_etag(etag)
    Digest::MD5.hexdigest(etag.to_json)
  end
end
