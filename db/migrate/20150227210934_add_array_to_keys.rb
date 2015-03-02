class AddArrayToKeys < ActiveRecord::Migration
  def change
    change_table :keys do |t|
      t.boolean :array, default: false
    end
  end
end
