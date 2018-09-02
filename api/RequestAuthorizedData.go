package api

import (
	"io/ioutil"
	"strings"

	"net/http"
)

// RequestAuthorizedData api(qiita,github)と path token を元に、認証済みのデータを取得する。
func RequestAuthorizedData(path string, token string, apiName string) []byte {
	method := "GET"

	// apiによってリクエスト先のURLを変える
	var URL string
	if apiName == "github" {
		URL = "https://api.github.com"
	} else if apiName == "qiita" {
		URL = "https://qiita.com/api/v2"
	}

	// body必須なので、からののbodyを作る
	body := strings.NewReader("")

	requestURL := URL + path
	// func NewRequest(method, url string, body io.Reader) (*Request, error)
	req, err := http.NewRequest(method, requestURL, body)
	if err != nil {
		panic(err)
	}

	// apiによってtokenの送り方を変える
	if apiName == "github" {
		req.Header.Set("Authorization", "token "+token)
	} else if apiName == "qiita" {
		req.Header.Set("Authorization", "Bearer "+token)
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
