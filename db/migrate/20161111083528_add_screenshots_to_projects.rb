class AddScreenshotsToProjects < ActiveRecord::Migration[4.2]
  def change
    change_table :projects do |t|
      t.boolean :screenshots, default: false
    end
  end
end
