@echo off
REM Song Data Update Script Launcher
REM Usage: update_songs.bat [options]
REM   (no args) - Show status
REM   /g         - Generate JS data
REM   /u         - Update index.html
REM   /l         - List all songs

cd /d "%~dp0.."
node scripts\update_songs.js %*
