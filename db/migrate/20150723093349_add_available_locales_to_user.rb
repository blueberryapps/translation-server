class AddAvailableLocalesToUser < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :available_locales, :string, array: true
  end
end
