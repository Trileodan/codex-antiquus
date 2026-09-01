@echo off
REM ---------------------------------------------------------------------
REM  Codex Antiquus - local server
REM
REM  index.html loads its JavaScript from separate files and Babel fetches
REM  them over XHR, which browsers block on file:// - so the multi-file
REM  version needs to be served over HTTP. This does that.
REM
REM  If you only want to READ the app, close this and open
REM  dist\codex-antiquus.html instead. That one is a single file and opens
REM  straight from disk.
REM ---------------------------------------------------------------------

cd /d "%~dp0"
set PORT=8000

py --version >nul 2>&1
if %errorlevel% equ 0 goto usepy

python --version >nul 2>&1
if %errorlevel% equ 0 goto usepython

npx --version >nul 2>&1
if %errorlevel% equ 0 goto usenpx

goto nothing

:usepy
call :banner
py -m http.server %PORT%
goto done

:usepython
call :banner
python -m http.server %PORT%
goto done

:usenpx
call :banner
npx --yes serve -l %PORT%
goto done

:banner
echo.
echo   Codex Antiquus is serving this folder at http://localhost:%PORT%/
echo.
echo   Leave this window open. Close it to stop the server.
echo   If the browser shows an error, give it a second and refresh.
echo.
start "" http://localhost:%PORT%/
goto :eof

:nothing
echo.
echo   Neither Python nor Node was found on this machine, so this script
echo   cannot start a server.
echo.
echo   Open dist\codex-antiquus.html instead - it is a single file and
echo   needs no server at all.
echo.
echo   If dist\ is empty or out of date, you need Python to run build.py.
echo   Install it from https://www.python.org/downloads/ and run this again.
echo.
pause
goto :eof

:done
echo.
echo   Server stopped.
pause
