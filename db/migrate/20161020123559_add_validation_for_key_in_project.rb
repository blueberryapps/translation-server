class AddValidationForKeyInProject < ActiveRecord::Migration
  def change
    add_index :keys, [:key, :project_id], unique: true
  end
end
