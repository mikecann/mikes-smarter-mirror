# mikes-smarter-mirror

set `/etc/rc.local` to:

```
#!/bin/bash

# Print the date and time of startup (for debugging)
echo "Startup initiated at $(date)" >> /home/pi/mirror.log

# Wait for 10 seconds to ensure everything is up and running
sleep 10

# Set the DISPLAY environment variable for the graphical environment
export DISPLAY=:0

# Change to the project directory
cd /home/pi/mikes-smarter-mirror

# Use `su -l` to run the command as the `pi` user in a login shell
sudo -u pi -i <<'EOF'
export DISPLAY=:0
/home/pi/.bun/bin/bun run start:prod >> /home/pi/mirror.log 2>&1 &
EOF

# Print success message to log
echo "Smart mirror application started successfully at $(date)" >> /home/pi/mirror.log

exit 0

```