#!/bin/bash

# Define variables
PROJECT_DIR="/home/pi/mikes-smarter-mirror"
BUN_PATH="/home/pi/.bun/bin/bun"
RC_LOCAL_FILE="/etc/rc.local"
LOG_FILE="/home/pi/mirror.log"

# Check if Bun is installed
if [ ! -f "$BUN_PATH" ]; then
  echo "[ERROR] Bun is not installed at ${BUN_PATH}. Please check the path and ensure Bun is installed."
  exit 1
else
  echo "[INFO] Found Bun at: ${BUN_PATH}"
fi

# Create a backup of /etc/rc.local if it doesn't already exist
if [ ! -f "${RC_LOCAL_FILE}.bak" ]; then
  echo "[INFO] Creating a backup of /etc/rc.local..."
  sudo cp $RC_LOCAL_FILE ${RC_LOCAL_FILE}.bak
fi

# Ensure /etc/rc.local has the proper shebang line
echo "[INFO] Ensuring /etc/rc.local has the proper shebang line..."
if ! grep -q '^#!/bin/bash' $RC_LOCAL_FILE; then
  sudo bash -c "echo '#!/bin/bash' | sudo tee $RC_LOCAL_FILE > /dev/null"
fi

# Add the startup command to /etc/rc.local if not already present
echo "[INFO] Modifying /etc/rc.local to add the startup command..."
if ! grep -q 'bun run start:prod' $RC_LOCAL_FILE; then
  sudo bash -c "echo '\
# Run Mike'\''s Smart Mirror project at startup\n\
cd $PROJECT_DIR\n\
su -c \"$BUN_PATH run start:prod\" pi > $LOG_FILE 2>&1 &\n' \
>> $RC_LOCAL_FILE"
fi

# Ensure /etc/rc.local ends with exit 0
if ! tail -n 1 $RC_LOCAL_FILE | grep -q "^exit 0"; then
  echo "[INFO] Adding 'exit 0' to /etc/rc.local..."
  sudo bash -c "echo 'exit 0' >> $RC_LOCAL_FILE"
fi

# Make /etc/rc.local executable
echo "[INFO] Setting /etc/rc.local as executable..."
sudo chmod +x $RC_LOCAL_FILE

echo "[INFO] Setup complete! The project will start automatically on boot. You can reboot to test the setup."
