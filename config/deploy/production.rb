set :stage,     :production
set :rails_env, 'production'
set :deploy_to, '/var/www/translation_server_com'

server 'REPLACE_ME',
       user: 'translation_server',
       roles: %w(web app db)
