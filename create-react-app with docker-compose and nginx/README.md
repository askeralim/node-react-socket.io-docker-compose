# Dockerise create-react-app with docker-compose and nginx
## Steps to follow
* Create Project folder
```
mkdir docker-compose-create-react-app
cd docker-compose-create-react-app
```
* Install create-react-app  [Installation Instructions](https://github.com/facebook/create-react-app) 
* Create a react.js project 
```
npx create-react-app web
cd web
```
* Create a Dockerfile inside server folder
	> touch Dockerfile
* Copy all the below content of the Dockerfile
```
FROM node:8 as cra-dc-build

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
    build: ./web
    expose:
      - 3000
    ports:
      - 3000:3000
    volumes:
      - ./web:/app
################################
#   Setup nginx load balancer
################################
  nginx:
    image: nginx:1.13 # this will use the latest version of 1.13.x
    ports:
      - '80:80' # expose 80 on host and sent to 80 in container
    depends_on: 
      - web
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro

```
* cd nginx
* pwd will print /docker-compose-create-react-app/nginx
* Create nginx.conf file
	> touch nginx.conf
* Copy the following contents to the nginx.conf file
```
upstream client_LB {
	server web:3000;
}
server {

	listen 80;
	location / {
		proxy_pass         http://client_LB;
		proxy_redirect     off;
		proxy_set_header   Host $host;
		proxy_set_header   X-Real-IP $remote_addr;
		proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header   X-Forwarded-Host $server_name;
	}
}
```
* cd ..
* pwd will print /docker-compose-create-react-app/ 
* Run the Docker Image with docker-compose
	> docker-compose up

	It will create the docker image and start running, Also it will run NGINX with mapping of  localhost to web:3000
	You can access the web http://localhost

#### Find out more about me

Askerali Maruthullathil [ - LinkedIn](http://linkedin.com/in/askeralim) 
