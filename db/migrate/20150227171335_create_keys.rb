class CreateKeys < ActiveRecord::Migration
  def change
    create_table :keys do |t|
      t.string :key
      t.text :note

      t.timestamps null: false
    end
  end
end
