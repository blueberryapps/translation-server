class AddEditedToTranslations < ActiveRecord::Migration
  def change
    add_column :translations, :edited, :boolean, default: false
  end
end
