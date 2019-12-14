class CreateDefaultProject < ActiveRecord::Migration[4.2]
  def up
    unless Project.where(id: 1).first
      Key.update_all(project_id: 1)

      Locale.update_all(project_id: 1)

      Location.update_all(project_id: 1)

      Project.create(
        id: 1,
        name: 'Default Project',
        default_locale_id: Locale.order(:id).first
      )
    end
  end
end
