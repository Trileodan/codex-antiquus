@echo off
REM ---------------------------------------------------------------------
REM  Field of Battle - launch the battle game
REM
REM  Standalone on purpose. It does not call serve.bat, and every exit
REM  path pauses, so if something goes wrong you get to read why instead
REM  of watching the window disappear.
REM ---------------------------------------------------------------------

cd /d "%~dp0"
set PORT=8000

echo.
echo   Field of Battle
echo   Folder: %CD%
echo.

if not exist "battle\index.html" goto nofiles

echo   Looking for Python or Node...
py --version >nul 2>&1
if %errorlevel% equ 0 goto usepy

python --version >nul 2>&1
if %errorlevel% equ 0 goto usepython

npx --version >nul 2>&1
if %errorlevel% equ 0 goto usenpx

goto noserver

:usepy
echo   Found the py launcher.
call :banner
py -m http.server %PORT%
goto done

:usepython
echo   Found python.
call :banner
python -m http.server %PORT%
goto done

:usenpx
echo   Found npx.
call :banner
npx --yes serve -l %PORT%
goto done

:banner
echo.
echo   Serving at http://localhost:%PORT%/battle/
echo.
echo   Leave this window open while you play. Close it to stop the server.
echo   If the browser shows an error, wait a second and refresh.
echo.
start "" http://localhost:%PORT%/battle/
goto :eof

:nofiles
echo   Could not find battle\index.html in this folder.
echo.
echo   This file has to sit in the project folder, next to index.html
echo   and the battle folder. If you moved or copied it somewhere else,
echo   put it back.
echo.
pause
goto :eof

:noserver
echo.
echo   Neither Python nor Node was found, so this script cannot start a
echo   server. That is fine - you do not need one.
echo.
echo   Open  dist\field-of-battle.html  instead. It is a single file with
echo   everything inlined and it opens straight from disk.
echo.
if exist "dist\field-of-battle.html" (
  echo   Opening it now...
  start "" "dist\field-of-battle.html"
) else (
  echo   That file is missing. Run  python3 build.py  to create it.
)
echo.
pause
goto :eof

:done
echo.
echo   Server stopped.
pause
