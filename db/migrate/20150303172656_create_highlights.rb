class CreateHighlights < ActiveRecord::Migration
  def change
    create_table :highlights do |t|
      t.belongs_to :image, index: true
      t.belongs_to :key, index: true
      t.integer :x
      t.integer :y
      t.integer :width
      t.integer :height

      t.timestamps null: false
    end
    add_foreign_key :highlights, :images
    add_foreign_key :highlights, :keys
  end
end
