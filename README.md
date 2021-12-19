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
   $ yarn install
   ```
3. In the root of the directory, use the following command:
    ```bash
    # If you want to run everything in the container
    $ yarn start:container:dev

    # If you want to run the source code offline
    $ yarn start:local:dev
    ```
✅ Done! Your application should be configured & up and running. Start developing!

#### Adding other services
Because [Gateway](https://git.ti.howest.be/TI/2021-2022/s5/trending-topics/projects/hybrid-work1/gateway), [Automation API](https://git.ti.howest.be/TI/2021-2022/s5/trending-topics/projects/hybrid-work1/automateapi) and [Back-End](https://git.ti.howest.be/TI/2021-2022/s5/trending-topics/projects/hybrid-work1/back-end) share the same custom network, you can build these and get the production server up & running.

- For [Automation API](https://git.ti.howest.be/TI/2021-2022/s5/trending-topics/projects/hybrid-work1/automateapi), clone the project, navigate to the root of the project and perform the following command:
  ```bash
  $ docker-compose up rust_prod -d
  ```
- For [Gateway](https://git.ti.howest.be/TI/2021-2022/s5/trending-topics/projects/hybrid-work1/gateway), clone the project, navigate to the root of the project and perform the following command:
  ```bash
  $ yarn start:container:prod
  ```
## Available `start` commands
|Command|Explication|
|---|---|
|`yarn run start`|Starts a development server **without** any hot-reloading capabilities, **without** any of the necessary containers. |
|`yarn run start:dev`|Start a fully **containerized** development server **with** hot-reloading capabilities, **without** any of the necessary containers.|
|`yarn run start:prod`|Starts a production-ready server, **without** any of the necessary containers.|
|||
|`yarn run start:local`|Start a development server without any hot-reloading capabilities, where **the app is runned locally**, but the needed containers are started.|
|`npm run start:local:dev`|Start a development server **with** hot-reloading capabilities, where **the app is runned locally**, but the needed containers are started.|
|`npm run start:local:prod`|Starts a production-ready server, where **the app is runned locally**, but the needed containers are started.|
|||
|`yarn run start:container:dev`|Starts a containerized development server, **with** hot-reloading capabilities & necessary containers|
|`yarn run start:container:prod`|Starts a containerized production server.|
|||
|`yarn run test`|Runs all unit tests|
|`yarn run test:e2e`|Runs all e2e tests|
|`yarn run test:cov`|Runs all coverage tests|
  
# Miscellaneous
## `.env` configuration
> :bulb: An example `.env` is available! Copy `.env.example` and rename it to `.env` to get started.

|Key|Value explanation|Value example|
|---|---|---|
|COMPOSE_PROJECT_NAME|Name of the compose stack|"MYT Back-end Server"|
||||
|NESTJS_PORT|The port used to reach the application from external networks|3000|
|MONGO_ENDPOINT|The endpoint used by the application to reach the MongoDB|localhost|
|MONGO_PORT|The port used by the application to reach the MongoDB|27017|
|MONGO_USERNAME|The username that the app uses to access the database|root|
|MONGO_PASSWORD|The username that the app uses to access the database|zXnpa&VDpoj6RU|
|MONGO_DB|The name of the database the app uses|MYT|
|AUTOMATE_ENDPOINT|The endpoint used by the application to reach the automate server|localhost|
|AUTOMATE_PORT|The port used by the application to reach the automate server|3000|
|GATEWAY_ENDPOINT|The endpoint used by the application to reach the gateway server|localhost|
|GATEWAY_PORT|The port used by the application to reach the gateway server|3000|
|RABBITMQ_ENDPOINT|The address used by the app to reach Rabbit MQ|localhost|
|RABBITMQ_PORT|The port used by the app to communicate with Rabbit MQ|5672|
||||
|NESTJS_EXPOSE_PORT|The port the app is exposed **through the container**|3030|
|DOCKER_MONGO_ROOT_USERNAME|The name of the root user of the MongoDB container|root|
|DOCKER_MONGO_ROOT_PASSWORD|The password of the root user of the MongoDB container|zXnpa&VDpoj6RU|
|DOCKER_MONGO_INIT_DB|The name of the database within the MongoDB Container|MYT|
|DOCKER_MONGO_EXTERNAL_PORT|The external port used to reach the MongoDB container from a **external** network|27017|
|DOCKER_MONGO_ENDPOINT|The endpoint used by the application to reach the database **within the container**|localhost|
|DOCKER_MONGO_PORT|The port used by the application to reach the database **within the container**|27017|
|DOCKER_MONGO_USERNAME|The username that the app uses to access the database **within the container**|root|
|DOCKER_MONGO_PASSWORD|The username that the app uses to access the database **within the container**|zXnpa&VDpoj6RU|
|DOCKER_MONGO_DB|The name of the database the app uses **within the container**|MYT|
|DOCKER_AUTOMATE_ENDPOINT|The endpoint used by the application to reach the automate server **within the container**|localhost|
|DOCKER_AUTOMATE_PORT|The port used by the application to reach the automate server **within the container**|3000|
|DOCKER_GATEWAY_ENDPOINT|The endpoint used by the application to reach the gateway server **within the container**|localhost|
|DOCKER_GATEWAY_PORT|The port used by the application to reach the gateway server **within the container**|3000|
|DOCKER_RABBITMQ_ENDPOINT|The address used by the app to reach Rabbit MQ **within the container**|localhost|
|DOCKER_RABBITMQ_PORT|The port used by the app to communicate with Rabbit MQ **within the container**|5672|
|DOCKER_RABBITMQ_EXTERNAL_PORT|The port used **outside** the container network to communicate with Rabbit MQ **within the container**|5672|
|DOCKER_RABBITMQ_EXTERNAL_MANAGEMENT_PORT|The port used **outside** the container network to communicate with Rabbit MQ **within the container**|15672|

