class CreateTranslations < ActiveRecord::Migration[4.2]
  def change
    create_table :translations do |t|
      t.belongs_to :key, index: true
      t.belongs_to :locale, index: true
      t.text :text

      t.timestamps null: false
    end
    add_foreign_key :translations, :keys
    add_foreign_key :translations, :locales
  end
end
