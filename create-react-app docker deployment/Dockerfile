FROM node:8 as chatapp-build

#Setting the working directory as /app
WORKDIR /app

#Copying everything to Docker Image
COPY . ./

#Installing all dependencies.
RUN npm install

# Running the dev server.
CMD ["npm", "start"]
