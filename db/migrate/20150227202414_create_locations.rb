class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :path

      t.timestamps null: false
    end
  end
end
