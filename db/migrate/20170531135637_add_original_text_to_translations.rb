class AddOriginalTextToTranslations < ActiveRecord::Migration
  def up
    add_column :translations, :original_text, :text

    Translation.all.each do |translation|
      translation.update(original_text: translation.text)
    end
  end

  def down
    remove_column :translations, :original_text
  end
end
