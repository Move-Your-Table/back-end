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
    # If you want to run everything in the container
    $ npm run start:container:dev

    # If you want to run the source code offline
    $ npm run start:local:dev
    ```
✅ Done! Your application should be configured & up and running. Start developing!

## Available `start` commands
|Command|Explication|
|---|---|
|`npm run start`|Starts a development server **without** any hot-reloading capabilities, **without** any of the necessary containers. |
|`npm run start:dev`|Start a fully **containerized** development server **with** hot-reloading capabilities, **without** any of the necessary containers.|
|`npm run start:prod`|Starts a production-ready server, **without** any of the necessary containers.|
|||
|`npm run start:local`|Start a development server without any hot-reloading capabilities, where **the app is runned locally**, but the needed containers are started.|
|`npm run start:local:dev`|Start a development server **with** hot-reloading capabilities, where **the app is runned locally**, but the needed containers are started.|
|`npm run start:local:prod`|Starts a production-ready server, where **the app is runned locally**, but the needed containers are started.|
|||
|`npm run start:container:dev`|Starts a containerized development server, **with** hot-reloading capabilities & necessary containers|
|`npm run start:container:staging`|Starts a containerized staging server.|
|`npm run start:container:prod`|Starts a containerized production server.|
|||
|`npm run test`|Runs all unit tests|
|`npm run test:e2e`|Runs all e2e tests|
|`npm run test:cov`|Runs all coverage tests|
  
# Miscellaneous
## `.env` configuration
> :bulb: An example `.env` is available! Copy `.env.example` and rename it to `.env` to get started.

|Key|Value explanation|Required for Development?|... Staging?|... Production?|Value example|
|---|---|---|---|---|---|
|COMPOSE_PROJECT_NAME|Name of the compose stack|✖|✖|✖|"MYT Back-end Server"|
|||||||
|NESTJS_PORT|The port used to reach the application from external networks|✔* </br> *\*If the code's running locally*|✖|✖|3000|
|MONGO_ENDPOINT|The endpoint used by the application to reach the MongoDB|✔* </br> *\*If the code's running locally*|✖|✖|localhost|
|MONGO_PORT|The port used by the application to reach the MongoDB|✔* </br> *\*If the code's running locally*|✖|✖|27017|
|AUTOMATE_ENDPOINT|The endpoint used by the application to reach the automate server|✔* </br> *\*If the code's running locally*|✖|✖|localhost|
|AUTOMATE_PORT|The port used by the application to reach the automate server|✔* </br> *\*If the code's running locally*|✖|✖|3000|
|GATEWAY_ENDPOINT|The endpoint used by the application to reach the gateway server|✔* </br> *\*If the code's running locally*|✖|✖|localhost|
|GATEWAY_PORT|The port used by the application to reach the gateway server|✔* </br> *\*If the code's running locally*|✖|✖|3000|
|||||||
|MONGO_ROOT_USERNAME|The name of the root user of the database|✔|✔|✔|root|
|MONGO_ROOT_PASSWORD|The password of the root user of the MongoDB|✔|✔|✔|zXnpa&VDpoj6RU|
|MONGO_INIT_DB|The name of the database being used|✔|✔|✔|MYT|
|MONGO_EXTERNAL_PORT|The external port used to reach the database from a **external** network|✔|✔|✖|27017|
|||||||
|RABBITMQ_ENDPOINT|The address used **within** the container network to reach Rabbit MQ|✔* </br> *\*If the code's running locally*|✖|✖|localhost|
|RABBITMQ_PORT|The port used **within** the container network to communicate with Rabbit MQ|✔* </br> *\*If the code's running locally*|✖|✖|5672|
|RABBITMQ_EXTERNAL_PORT|The port used **outside** the container network to communicate with Rabbit MQ|✔|✔|✖|5672|
|RABBITMQ_EXTERNAL_MANAGEMENT_PORT|The port used **outside** the container network to communicate with Rabbit MQ|✔|✔|✖|15672|

