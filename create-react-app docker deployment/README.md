# Dockerise create-react-app 
## Steps to follow
* Install create-react-app  [Installation Instructions](https://github.com/facebook/create-react-app) 
* Create a react.js project 
	> npx create-react-app my-app
	> cd my-app
* Create a Dockerfile inside my-app folder
	> touch Dockerfile
* Copy all the below content of the Dockerfile
```
FROM node:8 as chatapp-build

#Setting the working directory as /app
WORKDIR /app

#Copying everything to Docker Image
COPY . ./

#Installing all dependencies.
RUN npm install

# Running the dev server.
CMD ["npm", "start"]
```
* Create docker image 
	> docker build -t "my-app-image" .
* Run the Docker Image
	> docker run -p 3000:3000 my-app-image


#### Find out more about me

Askerali Maruthullathil [ - LinkedIn](http://linkedin.com/in/askeralim) 