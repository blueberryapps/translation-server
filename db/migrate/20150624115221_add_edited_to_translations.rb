class AddEditedToTranslations < ActiveRecord::Migration[4.2]
  def change
    add_column :translations, :edited, :boolean, default: false
  end
end
