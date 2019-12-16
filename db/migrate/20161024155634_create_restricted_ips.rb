class CreateRestrictedIps < ActiveRecord::Migration[4.2]
  def change
    create_table :restricted_ips do |t|
      t.inet :ip
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :restricted_ips, :users
  end
end
