@echo off
cd ..
call venv\Scripts\activate
start cmd /k "python manage.py runserver"
cd fit-frontend
npm install
npm start 