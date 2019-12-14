class CreateKeys < ActiveRecord::Migration[4.2]
  def change
    create_table :keys do |t|
      t.string :key
      t.text :note

      t.timestamps null: false
    end
  end
end
