class AddLocaleToHighlightsAndImages < ActiveRecord::Migration
  def change
    change_table :highlights do |t|
      t.belongs_to :locale,   index: true
      t.belongs_to :location, index: true
    end
  end
end
