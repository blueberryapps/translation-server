class AddProjectsUsers < ActiveRecord::Migration
  def change
    create_table :projects_users do |t|
      t.integer :project_id, index: true
      t.integer :user_id,    index: true
    end
  end
end
