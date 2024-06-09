# Welcome to Music Streaming!

Music Streaming is a full stack prototype that utilizes technologies such as Django, Django Rest Framework, and ReactJS for a platform for users to upload music collections and stream them from the web.

## Application Structure

The application is split into two separate folders [frontend](https://github.com/squee72564/Music-Streaming/tree/main/app/frontend) and [backend](https://github.com/squee72564/Music-Streaming/tree/main/app/backend) that are meant to conceptually separate the user facing code and the server code on the backend.

Is is important to note that this is only a conceptual difference for organizing the code. Some of the code used for rendering static HTML content using Django templates exists in the appropriate locations for the framework (particularly the folders named "templates" in the backend files).

## Build/Run the application

You can deploy this application you will need docker-compose and npm installed.

1. Clone this git repository locally onto your device

### Transpile and bundle React JSX/JS code first

2. In the frontend folder:

- run `npm install` to install required JS packages
- run `npm run webpack-prod` to transpile JS/JSX files with babel and send them to the static files folder for the application to be served by the server
- run `npm run tailwind-prod` to parse JS/JSX files for TailwindCSS classes utilized and send the output .css file to the static files folder for the application to be served by the server

### Use docker-compose to deploy the application

3. In the base directory for the project run the following command to build the music-streaming container:

- docker-compose up -d --build

- Note: If the web-app service for the container does not deploy properly with the error `"/src/app/entrypoint.sh does not exist"` you may need to normalize the line endings from CRLF to LF.
	- Git may automatically make the conversion to CRLF when cloning/pulling to a windows machine and it may cause issues.

5. Next we want to flush and migrate the database so it is set up properly:

- `docker-compose exec web-app python manage.py flush --no-input`
- `docker-compose exec web-app python manage.py migrate`

6. You should now be able to access the application from localhost:8000

## Example images

<img  src="https://github.com/squee72564/Music-Streaming/raw/main/github/home.PNG"  alt="home page"  width="400">

<img  src="https://github.com/squee72564/Music-Streaming/raw/main/github/login.PNG"  alt="login page"  width="400">

<img  src="https://github.com/squee72564/Music-Streaming/raw/main/github/collection.png"  alt="music collection page"  width="400">

## TODO:

- Better CSS style for the pages

- Set up nginx to serve static files instead of the Django server
