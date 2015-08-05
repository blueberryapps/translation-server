class AddAvailableLocalesToUser < ActiveRecord::Migration
  def change
    add_column :users, :available_locales, :string, array: true
  end
end
