class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.belongs_to :location, index: true
      t.belongs_to :key, index: true
      t.string :variant
      t.integer :x
      t.integer :y
      t.integer :width
      t.integer :height
      t.text :image

      t.timestamps null: false
    end
    add_foreign_key :images, :locations
    add_foreign_key :images, :keys
  end
end
