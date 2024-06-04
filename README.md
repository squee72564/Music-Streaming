# Welcome to Music Streaming!

Music Streaming is a full stack prototype that utilizes technologies such as Django, Django Rest Framework, and ReactJS for a platform for users to upload music collections and stream them from the web.

## Application Structure

The application is split into two separate folders [frontend](https://github.com/squee72564/Music-Streaming/tree/main/frontend) and [backend](https://github.com/squee72564/Music-Streaming/tree/main/backend) that are meant to conceptually separate the user facing code and the server code on the backend.

Is is important to note that this is only a conceptual difference for organizing the code; some of the "frontend" specific code used for rendering static HTML content using Django templates exists in the appropriate locations for the framework (particularly the folders named "templates" in the backend files).

## Build/Run the application

You will need Python for Django, NPM for the ReactJs, and PostgreSQL for the database (you can also use Sqlite3 if you choose).

Right now to build and run the application you can do the following steps:

1. Clone this git repository locally onto your device

### Setting up the Django backend and Database

2. In the backend folder:

- I recommend creating a python virtual environment in the backend folder to manage and separate the dependencies from your current environment and installed packages to avoid conflicts, ie. `python -m venv venv`

- Activate the virtual environment

  - This is different across OSs, but after creating the venv there will be a `venv/scripts/` or `venv/bin/` directory that has the "activate" script to start up the virtual environment

- run `pip install -r requirements.txt` to install Django and other necessary python packages to the virtual environment

- If you are choosing PostgreSQL for the database you will need the following steps:

  - To Be Added...
  - https://docs.djangoproject.com/en/5.0/ref/databases/#postgresql-notes
  - https://www.postgresql.org/docs/current/libpq-pgservice.html
  - https://www.postgresql.org/docs/current/libpq-pgpass.html

- If you are choosing SQLite3 for the database you can simply uncomment the appropriate `DATABASES` configuration variable in `backend/backend/settings.py`, and then comment out the PostgreSQL configuration variable.

- run `python manage.py makemigrations` to setup migrations to the database

- run `python manage.py migrate` to actually make the migrations to the database

- **These steps need to be completed for the application to work properly**

### Transpile and bundle React JSX/JS code to be served from the Django server

3. In the frontend folder:

- run `npm install` to install required JS packages

- run `npm run webpack-dev` to transpile JS/JSX files with babel and send them to the static files folder for the application to be served by the server

- run `npm run tailwind` to parse JS/JSX files for TailwindCSS classes utilized and send the output .css file to the static files folder for the application to be served by the server

### Running the Django Server

5. In the backend folder you can run `python manage.py runserver` to start the server which will allow the web app be accessed through your localhost IP on port 8000: `http://127.0.0.1:8000/`

## Example images

<img  src="https://github.com/squee72564/Music-Streaming/raw/main/github/home.PNG"  alt="home page"  width="400">

<img  src="https://github.com/squee72564/Music-Streaming/raw/main/github/login.PNG"  alt="login page"  width="400">

<img  src="https://github.com/squee72564/Music-Streaming/raw/main/github/collection.png"  alt="music collection page"  width="400">

## TODO:

- Better CSS style for the pages

- Set up nginx to serve static files instead of the Django server

- Automate the build process

- Containerize the application for easy deployment using a service like Docker
