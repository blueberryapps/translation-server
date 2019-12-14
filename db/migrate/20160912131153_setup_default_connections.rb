class SetupDefaultConnections < ActiveRecord::Migration[4.2]
  def up
    users = User.all.to_a
    Project.all.each do |project|
      puts "Assigning #{users.map(&:email).join(',')} to #{project.name}"
      project.update(users: users)
    end
  end
end
