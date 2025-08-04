#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Start the SSH tunnel in the background
# The -f flag sends ssh to the background. -N means do not execute a remote command.
KEY_FILE="/root/.ssh/id_rsa"
mkdir -p /root/.ssh
chmod 700 /root/.ssh
echo "Starting SSH tunnel..."
echo "Storing ssh key in $KEY_FILE"
touch $KEY_FILE
chmod 600 $KEY_FILE
echo "$PRIV_KEY" | base64 -d > $KEY_FILE
# Start the SSH tunnel in a persistent background loop
(
  while true; do
    echo "Starting SSH tunnel..."
    ssh -o StrictHostKeyChecking=no \
        -o ServerAliveInterval=60 \
        -o ServerAliveCountMax=5 \
        -o TCPKeepAlive=yes \
        -o ExitOnForwardFailure=yes \
        -N -i $KEY_FILE -R 8085:localhost:3000 ssh-tunnel@54.71.13.19
    echo "SSH tunnel dropped, reconnecting in 10 seconds..."
    sleep 10
  done
) &
# Start the web server in the foreground
echo "Starting web server..."
exec pnpm start
