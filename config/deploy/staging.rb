set :stage,     :staging
set :deploy_to, '/var/www/translation_server_webapps_cz'
set :rails_env, 'staging'

server 'REPLACE_ME',
        user: 'translation_server_webapps_cz',
        roles: %w(web app db)

