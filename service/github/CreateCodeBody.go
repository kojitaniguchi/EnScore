package service

import (
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// CreateCodeBody URL Queryからcode を取得し, access_tokenを所得する
func CreateCodeBody(c *gin.Context) *strings.Reader {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// URLからaccess_token 取得のために必要な code を取得する
	code := c.Request.URL.Query().Get("code")
	clientID := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")

	// url.Values{} は httpリクエストを送るときの query parameters として使われる
	values := url.Values{}
	values.Add("code", code)
	values.Add("client_id", clientID)
	values.Add("client_secret", clientSecret)

	// func (v Values) Encode() string
	// valuesをURLEncodeする(ここでは valueを stringにする意味必要性からぽい))
	EncodedQuery := values.Encode()

	// func NewReader(s string) *Reader
	// http.NewRequest の ために type *strings.Reader にする
	body := strings.NewReader(EncodedQuery)

	return body
}
