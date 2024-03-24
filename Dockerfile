FROM nginx:1.25.3

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./frontend/build/ /usr/share/nginx/html/

EXPOSE 80
