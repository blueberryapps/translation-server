workers Integer(ENV['WEB_CONCURRENCY'] || 1)
min_threads = Integer(ENV['MIN_THREADS'] || 3)
max_threads = Integer(ENV['MAX_THREADS'] || 8)
threads min_threads, max_threads

preload_app!

rackup      DefaultRackup
environment ENV['RACK_ENV'] || 'development'

on_worker_boot do
  ActiveRecord::Base.establish_connection

  Thread.new do
    begin
      ActiveRecord::Base.connection_pool.with_connection do |connection|
        loop do
          conn = connection.execute "NOTIFY heartbeat, 'heartbeat'"
          sleep 2.seconds
        end
      end
    ensure
    end
  end
end
