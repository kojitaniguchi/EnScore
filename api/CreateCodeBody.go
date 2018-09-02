package api

import (
	"bytes"
	"encoding/json"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// CodeBody AccessToken　リクエスト時のbody
type CodeBody struct {
	Code         string `json:"code"`
	ClientID     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
}

// CreateCodeBody code client_id client_secret を元にPOSTリクエストbodyを生成
func CreateCodeBody(c *gin.Context, apiName string) *bytes.Buffer {
	// dotenvの初期load
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// URLからaccess_token 取得のために必要な code を取得する
	code := c.Request.URL.Query().Get("code")

	// apiによってloadするenvを変える
	var clientID string
	var clientSecret string
	if apiName == "github" {
		clientID = os.Getenv("GITHUB_CLIENT_ID")
		clientSecret = os.Getenv("GITHUB_CLIENT_SECRET")
	} else if apiName == "qiita" {
		clientID = os.Getenv("QIITA_CLIENT_ID")
		clientSecret = os.Getenv("QIITA_CLIENT_SECRET")
	}

	// リクエストbodyをjsnoで統一する
	codeBody := CodeBody{
		Code:         code,
		ClientID:     clientID,
		ClientSecret: clientSecret,
	}
	authtoken, err := json.Marshal(codeBody)
	body := bytes.NewBuffer(authtoken)

	return body
}
