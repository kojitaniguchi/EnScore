# herokuデプロイまでの手順

**※goenvでバージョン管理行ってるので、path設定は以下の通り(僕はbashなので)**

```bash_profile
    export GOPATH=$HOME/go
    export PATH="$HOME/.goenv/bin:$PATH"
    eval "$(goenv init -)"
```

## herokuコマンド編
1. heroku login
2. heroku apps:create ${app-name} --buildpack heroku/go 
3. Procfileの作成

```Procfile
  web: ${app-name}
```

## gopathについて
1. deploy先のアプリケーションファイルのパスは $GOPATH に依存する。
**例**

```
  $ echo $GOPATH
  → /Users/hogehoge/go     
```

2. プロジェクトは $GOPATH 直下の src に作成する
**例**

```
  $ pwd 
  → /Users/hogehoge/go/src/project_name
```

3. herokuコマンド作った ${app-name} プロジェクトは src 配下に作成されるので、deployするときのpathは以下のように設定る

開発環境

```go:router.go
import (
	"hogehoge/controller"
)
```
↓

デプロイ時

```go:router.go
import (
	"${app-name}/controller"
)
```

## パッケージ管理について

1. dep init で パッケージ管理する
2. dep ensure で vendor に保存されていない packageを確認し、installする。
3. Gotomlにroot-pakage等について以下を追記する

```Gopkg.toml
    [metadata.heroku]
    root-package = "kyotohack2018-api"
    go-version = "go1.9.0"
    install = [ ".", "./cmd/..." ]
    ensure = "true"
```

## デプロイ編
1. 開発環境で使用していたローカル変数を,herokuに設定する。（ダッシュボードのsettingのConfig Vars → reveal config で設定できる。）
2. branch は master で行う（他に設定できないのかな？）
3. git add . → git commit- m 'deploy' → git push heroku master
4. deploy後のlog確認

```
$ heroku logs --tail
```

## lighthouse 実行環境構築

1. chromeをdebianで実行可能にするためにBuildpacksの追加
  - node実行環境とnpm環境の構築
    → https://github.com/heroku/heroku-buildpack-nodejs.git
  - headless browser の 実行環境構築
    * https://github.com/heroku/heroku-buildpack-chromedriver.git
    * https://github.com/heroku/heroku-buildpack-google-chrome.git
    * https://github.com/jontewks/puppeteer-heroku-buildpack.git 

2. lighthouseのinstall
    - package.json の scripts に "heroku-prebuild" や "heroku-postbuild" というheroku独自のscriptを入れることができる
    - pakage.json に "heroku-prebuild" : "npm install -g lighthouse" を追加しbuild時に lighthouseのinstall を実行する

3. CHROME_PATHの設定
    - 環境構築だけでは debian上では CHROME_PATHが設定されていないので、 lighthouse を実行することができない。
    - 環境変数に CHROME_PATH=/app/.apt/opt/google/chrome/chrome を設定する。

4. 実行コマンドのoptionについて。
   - "lighthouse --chrome-flags=\"--headless --no-sandbox --disable-gpu\" URL"
   - headless mode　で起動するためには --chrome-flags option設定を上記のようにして実行する。
