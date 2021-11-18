# MYT Back-end

## Description

The MYT Back-end handles all requested relating to desk, rooms & building information.

## Development Configuration
### Requirements
- [Docker (Desktop)](https://www.docker.com/get-started)
- [Node.JS LTS](https://nodejs.org/en/download/) & NPM
### Getting started
1. Copy the `.env.example` file, rename it `.env` and configure it, as described in the [`.env` configuration section](#env-configuration)
2. Install the needed packages
   ```bash
   $ npm install
   ```
3. In the root of the directory, use the following command:
    ```bash
    $ npm run start:dev
    ```
✅ Done! Your application should be configured & up and running. Start developing!
> 🚨 **Note:** For some reason, Nest.JS takes a lot of time to recompile it's code within a docker container, so the development server will run your code locally. If you want to develop your code within a **fully containerized** environment, you can run the following command:
>
> ```
> $ npm run start:container:dev
> ```

## Available `start` commands
- **`npm run start:container:dev`**
    
    Start a fully **containerized** development server **with** hot-reloading capabilities.
- **`npm run start`**
  
  Start a development server without any hot-reloading capabilities, where **the app is runned locally**, but the needed containers are started.
- **`npm run start:dev`**
  
  Start a development server **with** hot-reloading capabilities, where **the app is runned locally**, but the needed containers are started.
- **`npm run start:prod`**
  
  Starts a production-ready server, where **the app is runned locally**, but the needed containers are started.

## Available `Test` commands
- **`npm run test`**
  
  Runs all unit tests
- **`npm run test:e2e`**
  
  Runs all e2e tests
- **`npm run test:cov`**
  
  Runs all coverage tests
# Miscellaneous
## `.env` configuration
> :bulb: An example `.env` is available! Copy `.env.example` and rename it to `.env` to get started.

|Key|Value explanation|Required?|Value example|
|---|---|---|---|
|COMPOSE_PROJECT_NAME|The name of the Docker-Stack|✖|MYT_Backend|
|MONGO_ROOT_USERNAME|The name of the root user of the database|✔|root|
|MONGO_ROOT_PASSWORD|The password of the root user of the MongoDB|✔|zXnpa&VDpoj6RU|
|MONGO_INITDB_DATABASE|The name of the database being used|✔|MYT|
|MONGO_PORT|The port used by MongoDB|✔|27017|
|RABBITMQ_PORT|The port used by RabbitMQ|✔|5672|
|NESTJS_PORT|The port used by Nest.JS|✔|3000|
