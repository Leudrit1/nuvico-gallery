@echo off
echo ========================================
echo Pushing changes to Git repository...
echo ========================================

echo.
echo 1. Adding all changes...
git add .

echo.
echo 2. Committing changes...
git commit -m "Fix admin role system and authentication - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

echo.
echo 3. Pushing to remote repository...
git push origin main

echo.
echo ========================================
echo Push completed successfully!
echo ========================================
pause
