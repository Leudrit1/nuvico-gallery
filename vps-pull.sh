#!/bin/bash

echo "========================================"
echo "Pulling latest changes on VPS..."
echo "========================================"

echo ""
echo "1. Navigating to project directory..."
cd /path/to/your/project  # Replace with your actual project path

echo ""
echo "2. Stashing any local changes..."
git stash

echo ""
echo "3. Pulling latest changes from remote..."
git pull origin main

echo ""
echo "4. Installing/updating dependencies..."
npm install

echo ""
echo "5. Building the project..."
npm run build

echo ""
echo "6. Restarting the application..."
# If using PM2:
# pm2 restart your-app-name

# If using systemd:
# sudo systemctl restart your-app-name

# If running directly with node:
# pkill -f "node.*server"
# npm start &

echo ""
echo "========================================"
echo "VPS update completed successfully!"
echo "========================================"

echo ""
echo "Note: Make sure to update the project path in this script!"
echo "Current directory: $(pwd)"
