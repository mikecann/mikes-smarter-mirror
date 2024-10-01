# mikes-smarter-mirror

## Setup

set `/etc/rc.local` to:

```
#!/bin/bash

# Print the date and time of startup (for debugging)
echo "Startup initiated at $(date)" >> /home/pi/mirror.log

# Wait for 10 seconds to ensure everything is up and running
sleep 10

# Set the DISPLAY environment variable for the graphical environment
export DISPLAY=:0
echo "DISPLAY is set to $DISPLAY" >> /home/pi/mirror.log

# Change to the project directory
cd /home/pi/mikes-smarter-mirror

# Make sure the log file never gets too big
rm -rf /home/pi/mirror.log

# Use sudo -u pi -i to run the command as the pi user in a login shell
sudo -u pi /home/pi/.bun/bin/bun run ./scripts/prelaunch.ts >> /home/pi/mirror.log 2>&1 &

# Print success message to log
echo "Smart mirror application started successfully at $(date)" >> /home/pi/mirror.log

exit 0
```