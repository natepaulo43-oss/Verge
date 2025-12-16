@echo off
setlocal

set "BACKEND_DIR=%~dp0backend"
set "NEST_BIN=%BACKEND_DIR%\node_modules\.bin\nest.cmd"

if not exist "%NEST_BIN%" (
  echo [nest.cmd] Nest CLI binary not found at "%NEST_BIN%".
  echo [nest.cmd] Please run "npm install" inside the backend directory first.
  exit /b 1
)

call "%NEST_BIN%" %*

endlocal
