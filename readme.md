# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

Install ([Docker](https://www.docker.com/))
Run `docker-compose up` to create the relevant docker containers.

Once running you can ([Ping](http://localhost:3000/api/ping)) the backend to make sure everything is working.

Finally ([Register](http://localhost:3001/register)) a new user to make sure the front end is working correctly.
