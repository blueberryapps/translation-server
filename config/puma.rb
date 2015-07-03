workers Integer(ENV['WEB_CONCURRENCY'] || 1)
min_threads = Integer(ENV['MIN_THREADS'] || 3)
max_threads = Integer(ENV['MAX_THREADS'] || 8)
threads min_threads, max_threads

preload_app!

rackup      DefaultRackup
environment ENV['RACK_ENV'] || 'development'

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
