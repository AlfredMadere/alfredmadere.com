#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Start the SSH tunnel in the background
# The -f flag sends ssh to the background. -N means do not execute a remote command.
echo "Starting SSH tunnel..."
ssh -o StrictHostKeyChecking=no -f -N -i /root/.ssh/id_rsa -R 8085:localhost:3000 ssh-tunnel@54.71.13.19

# Start the web server in the foreground
echo "Starting web server..."
exec pnpm start
