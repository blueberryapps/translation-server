class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.belongs_to :location, index: true
      t.string     :name
      t.string     :variant
      t.text       :image

      t.timestamps null: false
    end
    add_foreign_key :images, :locations
  end
end
