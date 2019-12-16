web: jemalloc.sh bundle exec puma -e ${RACK_ENV:-staging} -C config/puma.rb -p ${PORT:-3000}
worker: jemalloc.sh bundle exec sidekiq -q default -q mailers -c 3
