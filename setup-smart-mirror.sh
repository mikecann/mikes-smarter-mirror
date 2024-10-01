#!/bin/bash

# Define variables
SERVICE_NAME="mikes-smarter-mirror"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
PROJECT_DIR="/home/pi/mikes-smarter-mirror"
USER="pi"

# Get Bun's location using the `pi` user environment
BUN_PATH=$(sudo -u ${USER} command -v bun)

if [ -z "$BUN_PATH" ]; then
  echo "[ERROR] Bun is not installed or not available in the PATH for the user ${USER}. Please install Bun first and ensure it is accessible."
  exit 1
else
  echo "[INFO] Found Bun at: ${BUN_PATH}"
fi

# Check if the service file already exists
if [ -f "$SERVICE_FILE" ]; then
  echo "[INFO] Service file ${SERVICE_FILE} already exists. Overwriting with new configuration..."
else
  echo "[INFO] Creating new systemd service file at ${SERVICE_FILE}..."
fi

# Create or overwrite the systemd service file
sudo tee $SERVICE_FILE > /dev/null <<EOL
[Unit]
Description=Smart Mirror - Mike's Project
After=network.target

[Service]
ExecStart=${BUN_PATH} run start:prod
WorkingDirectory=${PROJECT_DIR}
StandardOutput=inherit
StandardError=inherit
Restart=on-failure
User=${USER}
Environment=NODE_ENV=production
Environment=BUN_INSTALL=/home/pi/.bun

[Install]
WantedBy=multi-user.target
EOL

# Reload systemd to apply the new service
echo "[INFO] Reloading systemd daemon..."
sudo systemctl daemon-reload

# Enable the service to start on boot
if systemctl is-enabled --quiet ${SERVICE_NAME}; then
  echo "[INFO] Service ${SERVICE_NAME} is already enabled on boot."
else
  echo "[INFO] Enabling ${SERVICE_NAME} to start on boot..."
  sudo systemctl enable ${SERVICE_NAME}
fi

# Start or restart the service
if systemctl is-active --quiet ${SERVICE_NAME}; then
  echo "[INFO] Restarting the existing ${SERVICE_NAME} service..."
  sudo systemctl restart ${SERVICE_NAME}
else
  echo "[INFO] Starting ${SERVICE_NAME} service..."
  sudo systemctl start ${SERVICE_NAME}
fi

# Show service status
echo "[INFO] Service status:"
sudo systemctl status ${SERVICE_NAME} --no-pager

echo "[INFO] Setup complete. The service has been installed and started."
