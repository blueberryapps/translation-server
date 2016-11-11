class AddScreenshotsToProjects < ActiveRecord::Migration
  def change
    change_table :projects do |t|
      t.boolean :screenshots, default: false
    end
  end
end
