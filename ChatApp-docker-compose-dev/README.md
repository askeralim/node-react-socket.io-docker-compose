This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### ./startDevServer.sh

## Application Archetecture
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

Runs the app in the development mode.<br>
Open [http://localhost](http://localhost) to view it in the browser.

The page will reload if you make edits.<br>


#### Find out more about me

Askerali Maruthullathil [ - LinkedIn](http://linkedin.com/in/askeralim) 