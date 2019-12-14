class AddArrayToKeys < ActiveRecord::Migration[4.2]
  def change
    change_table :keys do |t|
      t.boolean :array, default: false
    end
  end
end
