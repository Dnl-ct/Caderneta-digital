@echo off
cd /d "C:\Users\usuario\Documents\Projeto-Agenda-eletronica"

git add .

git diff --cached --quiet
if %errorlevel%==0 (
    echo Nenhuma alteracao encontrada.
    pause
    exit
)

git commit -m "Backup automatico"
git push origin main

pause
