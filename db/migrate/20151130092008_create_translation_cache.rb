class CreateTranslationCache < ActiveRecord::Migration
  def change
    create_table :translation_caches do |t|
      t.string :etag
      t.text   :cache
      t.string :kind
    end
  end
end
