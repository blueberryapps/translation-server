class AddUserToTranslationsAndReleases < ActiveRecord::Migration
  def change
    add_column :translations, :user_id, :integer, index: true
    add_column :releases, :user_id, :integer, index: true
  end
end
