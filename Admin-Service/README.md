## To Install NPM Dependencies (one time command)
> npm run attpl:install

## To run the project locally in production mode
> npm run dev

## To build the project for PROF (make sure there is no error showning in the project).
> npm run build

## Also change .env file VITE_NODE_ENV to PROD

## To Check project after build (build in preview mode)
> npm run start

## To build docker image of User Management Service
> docker build -t attplattpl1/admin-service-dev:1.0.0 .

## To run the build image
> docker run -d --name admin-service-dev -p 3000:80 attplattpl1/admin-service-dev:1.0.0

## To push the docker image into private docker repo
> docker push attplattpl1/admin-service-dev:1.0.0

## To pull the docker image from private docker repo
> docker pull attplattpl1/admin-service-dev:1.0.0
