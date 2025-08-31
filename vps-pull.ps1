# PowerShell script for VPS update
Write-Host "========================================" -ForegroundColor Green
Write-Host "Pulling latest changes on VPS..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host ""
Write-Host "1. Navigating to project directory..." -ForegroundColor Yellow
# Replace with your actual project path
Set-Location "C:\path\to\your\project"

Write-Host ""
Write-Host "2. Stashing any local changes..." -ForegroundColor Yellow
git stash

Write-Host ""
Write-Host "3. Pulling latest changes from remote..." -ForegroundColor Yellow
git pull origin main

Write-Host ""
Write-Host "4. Installing/updating dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "5. Building the project..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "6. Restarting the application..." -ForegroundColor Yellow
# If using PM2:
# pm2 restart your-app-name

# If using Windows Service:
# Restart-Service -Name "YourAppService"

# If running directly with node:
# Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
# Start-Process -FilePath "npm" -ArgumentList "start" -WindowStyle Hidden

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "VPS update completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host ""
Write-Host "Note: Make sure to update the project path in this script!" -ForegroundColor Red
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Cyan
