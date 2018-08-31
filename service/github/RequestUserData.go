package service

import (
	"encoding/json"
	"io/ioutil"
	"strings"

	"net/http"
)

// RequestUserData accessTokenを利用して、userData取得をgetリクエスト。 返り値は Type に構造体を入れて定義する
func RequestUserData(githubAuthURL string, query string, token string, Struc struct{}) interface{} {
	method := "GET"
	body := strings.NewReader("")
	url := githubAuthURL + query
	// func NewRequest(method, url string, body io.Reader) (*Request, error)
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		panic(err)
	}

	// apiからのresponseでJSON を許可するために requestのカスタムヘッダーに　"Accept", "application/json" をセットする
	req.Header.Set("Authorization", token)

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
	type Type struct{}
	// json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする
	var data Type
	json.Unmarshal(byteArray, &data)

	return data
}
