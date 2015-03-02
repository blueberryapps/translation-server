class AddHighlightToImages < ActiveRecord::Migration
  def change
    add_column :images, :highlight, :boolean, default: false
  end
end
