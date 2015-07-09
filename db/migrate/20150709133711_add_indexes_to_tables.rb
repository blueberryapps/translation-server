class AddIndexesToTables < ActiveRecord::Migration
  def change
    add_index :locales, :code
    add_index :locations, :path
    add_index :images, :name
    add_index :keys, :key
    add_index :keys, [:key, :id]
    add_index :translations, [:key_id, :locale_id]
  end
end
