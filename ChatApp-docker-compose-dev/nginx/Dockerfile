# stage: 1
FROM nginx:1.13 as chat-app-nginx-build
WORKDIR /etc/nginx/conf.d/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ../client/img /etc/nginx/html/img