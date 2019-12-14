class AddFloatAndIntegerToKeys < ActiveRecord::Migration[4.2]
  def change
    add_column :keys, :data_type, :string, default: 'string'
    remove_column :keys, :array
  end
end
