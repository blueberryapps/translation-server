class CreateReleases < ActiveRecord::Migration[4.2]
  def change
    create_table :releases do |t|
      t.belongs_to :locale, index: true
      t.string :version
      t.text :yaml

      t.timestamps null: false
    end
    add_foreign_key :releases, :locales
  end
end
