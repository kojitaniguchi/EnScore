package service

import (
	"io/ioutil"
	"strings"

	"net/http"
)

// RequestApi accessTokenを利用して、userData取得をgetリクエスト
func RequestApi(query string, token string) []byte {
	method := "GET"
	githubAuthURL := "https://api.github.com"
	body := strings.NewReader("")
	url := githubAuthURL + query
	// func NewRequest(method, url string, body io.Reader) (*Request, error)
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		panic(err)
	}

	// apiからのresponseでJSON を許可するために requestのカスタムヘッダーに　"Accept", "application/json" をセットする
	req.Header.Set("Authorization", "token "+token)

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
	// json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする

	return byteArray
}
