class AddRoleToUser < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :role, :string

    User.all.each do |user|
      user.update_attribute(:role, 'admin')
    end
  end
end
