class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :default_locale_id, index: true
      t.string :api_token, index: true
      t.timestamps null: false
    end

    add_column :locales,   :project_id, :integer, index: true
    add_column :locations, :project_id, :integer, index: true
    add_column :keys,      :project_id, :integer, index: true
  end
end
