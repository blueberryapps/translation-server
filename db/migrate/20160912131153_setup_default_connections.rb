class SetupDefaultConnections < ActiveRecord::Migration
  def up
    users = User.all.to_a
    Project.all.each do |project|
      puts "Assigning #{users.map(&:email).join(',')} to #{project.name}"
      project.update(users: users)
    end
  end
end
