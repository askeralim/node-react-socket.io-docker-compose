# Dockerise create-react-app 
## Steps to follow
* Create Project folder
```
mkdir docker-compose-create-react-app
cd docker-compose-create-react-app
```
* Install create-react-app  [Installation Instructions](https://github.com/facebook/create-react-app) 
* Create a react.js project 
```
npx create-react-app server
cd server
```
* Create a Dockerfile inside my-app folder
	> touch Dockerfile
* Copy all the below content of the Dockerfile
```
FROM node:8 as chatapp-build

#Setting the working directory as /app
WORKDIR /app

#Copying package.json to Docker Image
COPY package.json /app

#Installing all dependencies.
RUN npm install

# Running the dev server.
CMD ["npm", "start"]
```
* Change directory to the parent folder 
```
cd ..
pwd will print /docker-compose-create-react-app
```
* Create docker-compose.yml file
	> touch docker-compose.yml
* Copy the following to the file
```
version: '3'

services:
################################
#   Setup react js container
################################
  web:
    build: ./server
    expose:
      - 3000
    ports:
      - 3000:3000
    volumes:
      - ./server:/app


```
* Run the Docker Image with docker-compose
	> docker-compose up

	It will create the docker image and start running, Also it will expose port 3000
	You can access the web http://localhost:3000

#### Find out more about me

Askerali Maruthullathil [ - LinkedIn](http://linkedin.com/in/askeralim) 