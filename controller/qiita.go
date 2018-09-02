package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"tutorial/api"
	"tutorial/model"
	service "tutorial/service/qiita"

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
	fmt.Println("ItemsCount: " + strconv.Itoa(UserData.ItemsCount))
	fmt.Println("FollowersCount: " + strconv.Itoa(UserData.FollowersCount))

	// ------------------- 投稿情報取得 ---------------------------
	byteArrayItemsData := api.RequestAuthorizedData("/authenticated_user/items?page=1&per_page=100", token, apiName)
	var Posts model.Posts                      // model UserData
	json.Unmarshal(byteArrayItemsData, &Posts) // json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする

	// ------------------- イイね数の取得 ---------------------------
	likesSum := service.SumLikesCount(Posts)
	fmt.Println("SumLikesCount: " + strconv.Itoa(likesSum))

	// ------------------- 活動頻度取得 ---------------------------
	ActivetyCount := service.ComputeQiitaActivety(Posts)
	fmt.Println("ActivetyCount: " + strconv.Itoa(ActivetyCount))

	c.Redirect(http.StatusMovedPermanently, "/")
}
