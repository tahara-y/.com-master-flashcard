FROM python:3.9-slim

WORKDIR /backend
COPY . .

# MySQLクライアントの依存関係をインストール
RUN apt-get update && apt-get install -y \
    vim less \
    default-libmysqlclient-dev gcc pkg-config libmariadb-dev \
    && rm -rf /var/lib/apt/lists/*

# Python依存関係をインストール
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install
