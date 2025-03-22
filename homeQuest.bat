@echo off
cd /d %~dp0

:: Start the server using nodemon
start cmd /k "npm run start"

:: Wait for 2 seconds to give the server time to start
timeout /t 2 >nul

:: Open Chrome and navigate to http://127.0.0.1:8000
start chrome http://127.0.0.1:9000
