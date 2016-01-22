worker_processes 4

# Help ensure your application will always spawn in the symlinked
# "current" directory that Capistrano sets up.
working_directory "/Users/artur/projects/redmine" # available in 0.94.0+

# listen on both a Unix domain socket and a TCP port,
# we use a shorter backlog for quicker failover when busy
# listen "/Users/artur/projects/redmine/tmp/sockets/redmine_chat.sock", :backlog => 2048
#listen 8080, :tcp_nopush => true
listen 9292, :tcp_nopush => true

# nuke workers after 30 seconds instead of 60 seconds (the default)
timeout 60

# feel free to point this anywhere accessible on the filesystem
pid "/Users/artur/projects/redmine/tmp/pids/unicorn_chat.pid"

# By default, the Unicorn logger will write to stderr.
# Additionally, ome applications/frameworks log to stderr or stdout,
# so prevent them from going to /dev/null when daemonized here:
stderr_path "/Users/artur/projects/redmine/log/unicorn_chat.stderr.log"
stdout_path "/Users/artur/projects/redmine/log/unicorn_chat.stdout.log"
