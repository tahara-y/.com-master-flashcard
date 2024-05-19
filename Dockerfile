FROM nginx:1.25.3

# ECS環境用の設定ファイル
COPY ./nginx/ecs/nginx.conf /etc/nginx/nginx.conf
# # local環境・EC2環境用の設定ファイル
# COPY ./nginx/local/nginx.conf /etc/nginx/nginx.conf
COPY ./frontend/build/ /usr/share/nginx/html/

EXPOSE 80
