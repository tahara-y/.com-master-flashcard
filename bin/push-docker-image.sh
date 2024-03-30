#!/bin/bash

# ECRリポジトリのURIを設定
ECR_URI="190204288304.dkr.ecr.ap-northeast-1.amazonaws.com/com-master-flashcard"

# イメージのタグを設定
IMAGE_TAG="0.0.2"

# フロントエンドDockerイメージのビルド
docker build -t $ECR_URI/frontend:$IMAGE_TAG -f ../frontend/Dockerfile .

# バックエンドDockerイメージのビルド
docker build -t $ECR_URI/backend:$IMAGE_TAG -f ../backend/Dockerfile .

# WebサーバーDockerイメージのビルド
docker build -t $ECR_URI/webserver:$IMAGE_TAG -f ../Dockerfile .

# AWS ECRへログイン
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin $ECR_URI

# イメージをECRへプッシュ
docker push $ECR_URI/frontend:$IMAGE_TAG
docker push $ECR_URI/backend:$IMAGE_TAG
docker push $ECR_URI/webserver:$IMAGE_TAG

echo "イメージをプッシュしました"
