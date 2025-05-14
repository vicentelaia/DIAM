@echo off
cd sitepr
start cmd /k "cd fit-frontend && npm start"
call venv\Scripts\activate
python manage.py runserver 