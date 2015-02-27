set :application, 'translation_server'
set :repo_url,    'git@github.com:blueberryapps/translation_server.git'
set :branch,      'master'
set :scm,         :git

set :format, :pretty
set :log_level, :debug

set :linked_files, %w(config/database.yml)
set :linked_dirs, %w(log tmp/pids tmp/cache tmp/sockets public/system)

set :rbenv_type, :system
set :rbenv_ruby, `git show #{fetch(:branch)}:.ruby-version`.strip

set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :finishing, 'deploy:cleanup'

end
