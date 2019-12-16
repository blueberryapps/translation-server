class CreateLocales < ActiveRecord::Migration[4.2]
  def change
    create_table :locales do |t|
      t.string :code

      t.timestamps null: false
    end
  end
end
