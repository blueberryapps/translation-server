class CreateLocations < ActiveRecord::Migration[4.2]
  def change
    create_table :locations do |t|
      t.string :path

      t.timestamps null: false
    end
  end
end
