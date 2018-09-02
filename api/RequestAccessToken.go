package api

import (
	"io/ioutil"
	"strings"

	"net/http"
)

// RequestAccessToken oauthを利用して、accessToken取得をPOSTリクエスト
func RequestAccessToken(body *strings.Reader, apiName string) []byte {
	method := "POST"

	// apiによってリクエスト先のURLを変える
	var URL string
	if apiName == "github" {
		URL = "https://github.com/login/oauth/access_token"
	} else if apiName == "qiita" {
		URL = "https://qiita.com/api/v2/access_tokens"
	}

	// func NewRequest(method, url string, body io.Reader) (*Request, error)
	req, err := http.NewRequest(method, URL, body)
	if err != nil {
		panic(err)
	}

	// apiからのresponseでJSON を許可するために requestのカスタムヘッダーに　"Accept", "application/json" をセットする
	if apiName == "github" {
		req.Header.Set("Accept", "application/json")
	} else if apiName == "qiita" {
		req.Header.Set("Content-Type", "application/json")
	}

	// clientを生成し、client.Do(req)でリクエストを実行
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// ioutil.ReadAll()は終端記号にあたるまで全データの読込をする。
	// streamをioutil.ReadAllで[]byteに変換する
	byteArray, _ := ioutil.ReadAll(resp.Body)

	return byteArray
}
