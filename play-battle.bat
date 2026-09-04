@echo off
REM ---------------------------------------------------------------------
REM  Field of Battle - launch the battle game
REM
REM  Starts the same local server serve.bat uses and opens the battle
REM  game instead of the learning app. Leave the black window open while
REM  you play; closing it stops the server.
REM ---------------------------------------------------------------------
call "%~dp0serve.bat" battle/
