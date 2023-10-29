# com-master-flashcard

チャレンジ課題としてドットコムマスターの単語帳アプリを作成します。

### backend ディレクトリ内に python の仮想環境を作成する手順

### 1. 仮想環境の作成

Python には、`venv`という標準ライブラリが含まれており、これを使って仮想環境を作成できます。
以下のコマンドによって、カレントディレクトリに`myenv`という名前の仮想環境が作成されます。
<コマンド>
python -m venv myenv

### 2. 仮想環境のアクティベート

作成された仮想環境をアクティベートします。
<コマンド>
source myenv/bin/activate

### 3. `requirements.txt`の作成

先程の手順で説明したように、必要なパッケージをインストールした後、以下のコマンドで`requirements.txt`を生成します。
<コマンド>
pip freeze > requirements.txt

### 4. `requirements.txt`を使用してモジュールのインストール

仮想環境がアクティベートされている状態で、以下のコマンドを実行することで、`requirements.txt`に記載された依存関係をインストールします。
<コマンド>
pip install -r requirements.txt

以上の手順で、`myenv`という仮想環境の中に`requirements.txt`にリストされたモジュールをインストールすることができます。

### .gitignore の作成

# myenv ディレクトリ（python の仮想環境）を無視

<!--
myenv
db.sqlite3
*.pyc
__pycache__
.DS_Store
/.gitignore
-->
