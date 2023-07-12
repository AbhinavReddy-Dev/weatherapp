# weatherapp

## To run the app

1. Clone the repo and run `cd weatherapp`.

- Create a `.env` file in the root directory and complete the variables as mentioned in `.env.example`, also in Dockerfiles of client and server and docker-compose.yml.

2. Run `cd client && npm install && npm run dev` to install the client dependencies and run the client.

3. In a seperate terminal, run `cd server && npm install && npm start` to install the server dependencies and run the server.

## To run using Docker Compose

Run `docker-compose up --build` to build and run the app.
