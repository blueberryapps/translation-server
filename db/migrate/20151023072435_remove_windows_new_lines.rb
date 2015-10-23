class RemoveWindowsNewLines < ActiveRecord::Migration
  def up
    Translation.where('text like ?', '%&#13;%').each do |translation|
      translation.update text: translation.text.gsub('&#13;', '')
    end
  end
end
