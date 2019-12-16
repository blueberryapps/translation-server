class AddAssocitionProjectToCache < ActiveRecord::Migration[5.2]
  def change
    drop_table :translation_caches

    create_table :translation_caches do |t|
      t.belongs_to :project, index: true, foreign_key: true, null: false
      t.text :cache_yaml
      t.text :cache_json

      t.timestamps
    end

    Scheduled::CacheTranslations.new.perform
  end
end
