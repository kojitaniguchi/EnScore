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
	body := api.CreateCodeBody(c, apiName)
	byteArrayAccessToken := api.RequestAccessToken(body, apiName) // AccessTokenの取得
	var data model.QiitaCredentialData
	json.Unmarshal(byteArrayAccessToken, &data)
	token := data.AccessToken
	fmt.Println("Qiita AccessToken: " + token)

	// ------------------- ユーザー情報取得 ---------------------------
	byteArrayUserData := api.RequestAuthorizedData("/authenticated_user", token, apiName)
	var UserData model.QiitaUserData             // model UserData
	json.Unmarshal(byteArrayUserData, &UserData) // json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする
	fmt.Println("UserData: " + UserData.ID)

	c.Redirect(http.StatusMovedPermanently, "/")
}
