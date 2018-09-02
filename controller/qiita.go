package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"tutorial/api"
	"tutorial/model"

	"github.com/gin-gonic/gin"
)

// QiitaCallback : qiitaのscore取得
func QiitaCallback(c *gin.Context) {
	apiName := "qiita"

	// ----------------- AccessToke取得 --------------------------
	// code client_id client_secret を元にPOSTリクエストbodyを生成
	body := api.CreateCodeBody(c, apiName)
	byteArrayAccessToken := api.RequestAccessToken(body, apiName) // AccessTokenの取得
	var data model.QiitaCredentialData
	json.Unmarshal(byteArrayAccessToken, &data)
	token := data.AccessToken
	// fmt.Println(data)
	fmt.Println("Qiita AccessToken: " + token)

	c.Redirect(http.StatusMovedPermanently, "/")
}
