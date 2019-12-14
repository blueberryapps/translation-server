class AddValidationForKeyInProject < ActiveRecord::Migration[4.2]
  def change
    add_index :keys, [:key, :project_id], unique: true
  end
end
