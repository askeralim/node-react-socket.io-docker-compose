This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## ChatApp Dev - Archetecture:
![Application Archetecture](https://github.com/askeralim/node-react-socket.io-docker-compose/blob/master/ChatApp-docker-compose-dev/ChatApp-Archetecture.JPG)
## ChatApp Dev - Technology Stack:
![Technology Stack](https://github.com/askeralim/node-react-socket.io-docker-compose/blob/master/ChatApp-docker-compose-dev/TechnologyStack.jpg)
## Application Screen Video:
![Application Screen Video](https://github.com/askeralim/node-react-socket.io-docker-compose/blob/master/ChatApp-docker-compose-dev/ChatApp.gif)
## Available Scripts

In the project directory, you can run the development server with following command:
```
./startDevServer.sh

	* This command will install all the dependencies in the local folder for the following
		* server Socket.io 
		* client react.js
```
This application is developed with docker containers with react.js as front end and socket.io as backend with redis with nginx as reverse proxy.
### docker-compose.yml
```
version: '3'

services:
################################
#   Setup react app container
################################
  web:
    build: ./client
    expose:
      - 3000
    volumes:
      - ./client:/app

################################
#   Setup REDIS Server
################################
  redis:
    image: redis:3.2-alpine
    expose:
      - 6379
    volumes:
      - redis_data:/data
################################
#   Setup Socket Server container
################################
  server:
    build: ./server
    expose:
      - 3001
    depends_on: 
      - redis
    volumes:
      - ./server:/app
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
volumes:  
  redis_data:

```
### NGINX Configuration
```
upstream client_LB {
	server web:3000;
}
upstream server_LB {
	ip_hash;
	server server:3001;
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
	location /socket.io/ {
		proxy_pass         http://server_LB;
		proxy_redirect     off;
		proxy_set_header   Host $host;
		proxy_set_header   X-Real-IP $remote_addr;
		proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header   X-Forwarded-Host $server_name;
    }
	
	location /img {
		alias /etc/nginx/html/img;
	}
}

```

Runs the app in the development mode.<br>
Open [http://localhost](http://localhost) to view it in the browser.

The page will reload if you make edits.<br>


#### Find out more about me

Askerali Maruthullathil [ - LinkedIn](http://linkedin.com/in/askeralim) 
