package service

import (
	"encoding/json"
	"io/ioutil"
	"strings"

	"net/http"
)

// CredentialData access_tokenが入ったreponseの json 構造体
type CredentialData struct {
	AccessToken string `json:"access_token"`
	Scope       string `json:"scope"`
	TokenType   string `json:"token_type"`
}

// RequestAccessToken oauthを利用して、accessToken取得をPOSTリクエスト
func RequestAccessToken(githubAuthURL string, body *strings.Reader) CredentialData {
	method := "POST"
	// func NewRequest(method, url string, body io.Reader) (*Request, error)
	req, err := http.NewRequest(method, githubAuthURL, body)
	if err != nil {
		panic(err)
	}

	// apiからのresponseでJSON を許可するために requestのカスタムヘッダーに　"Accept", "application/json" をセットする
	req.Header.Set("Accept", "application/json")

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
	var data CredentialData
	json.Unmarshal(byteArray, &data)

	return data
}
