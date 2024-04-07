FROM python:3.9-slim-buster

WORKDIR /backend
COPY . .

# 依存関係をインストール（MySQLクライアント含む）
# また、イメージのサイズを小さく保つために、一時ファイルを削除します。
RUN apt-get update && apt-get install -y \
    vim less \
    default-libmysqlclient-dev gcc pkg-config libmariadb-dev \
    default-mysql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# Python依存関係をインストール
RUN pip install poetry pymysql
RUN poetry config virtualenvs.create false

# Poetryのlockファイルが変更されている場合は、poetry lockを実行してからinstallを行う
RUN poetry lock --no-update && poetry install --no-interaction --no-ansi
