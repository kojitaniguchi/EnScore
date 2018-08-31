package controller

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

// QiitaCallback : /github/callback でaccesstokenを取得する controller
// 1. githubの access_toke 取得の postリクエスト には カスタムheader をつける必要がある。
// 2. http.Post ではなく http.NewRequest を使う必要がある。(http.Postにはカスタムheaderをつけることができない)
func QiitaCallback(c *gin.Context) {
	// URLからaccess_token 取得のために必要な code を取得する
	code := c.Request.URL.Query().Get("code")
	clientID := "3f9d2552863099f642b8"
	clientSecret := "6fb597ff227bf7701642500562eea596d330ad52"

	// codeを含めたリクエストbodyを作成
	body := Body{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Code:         code,
	}
	// bodyをjson変換し、access_token取得のendpoinにPOST request
	// func Marshal(v interface{}) ([]byte, error)
	// json.Marshalは、構造体のjsonタグがあればその値をキーとしてJSON文字列を生成する
	request, err := json.Marshal(body)

	// func (c *Client) Post(url, contentType string, body io.Reader) (resp *Response, err error)
	// io.Readerインタフェースによって、外部からデータを読み込む為の機能
	resp, err := http.Post("https://github.com/login/oauth/access_token", "application/json", bytes.NewBuffer(request))

	if err != nil {
		panic(err)
	}

	// ioutil.ReadAll()は終端記号にあたるまで全データの読込をする。メモリに収まらない場合はエラー
	buffer, _ := ioutil.ReadAll(resp.Body)

	// json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする
	var data CredentialData
	json.Unmarshal(buffer, &data)

	fmt.Println(data.AccessToken)
}

// Body access_token 取得のために "https://github.com/login/oauth/access_token" に POSTリクエストするときの body 構造体
type Body struct {
	ClientID     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	Code         string `json:"code"`
}

// CredentialData access_tokenが入ったreponseの json 構造体
type CredentialData struct {
	AccessToken string `json:"access_token"`
	Scope       string `json:"scope"`
	TokenType   string `json:"token_type"`
}
