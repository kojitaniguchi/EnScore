package controller

import (
	"encoding/json"
	"fmt"
	"kyotohack2018-api/api"
	"kyotohack2018-api/model"
	service "kyotohack2018-api/service/qiita"
	"net/http"
	"strconv"

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
	fmt.Println("-------------------------------------")
	fmt.Println("Qiita AccessToken: " + token)

	// ------------------- ユーザー情報取得 ---------------------------
	byteArrayUserData := api.RequestAuthorizedData("/authenticated_user", token, apiName)
	var UserData model.QiitaUserData             // model UserData
	json.Unmarshal(byteArrayUserData, &UserData) // json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする
	ItemsCount := UserData.ItemsCount
	FollowersCount := UserData.FollowersCount
	fmt.Println("-------------------------------------")
	fmt.Println("ItemsCount: " + strconv.Itoa(ItemsCount))
	fmt.Println("FollowersCount: " + strconv.Itoa(UserData.FollowersCount))

	// ------------------- 投稿情報取得 ---------------------------
	byteArrayItemsData := api.RequestAuthorizedData("/authenticated_user/items?page=1&per_page=100", token, apiName)
	var Posts model.Posts                      // model UserData
	json.Unmarshal(byteArrayItemsData, &Posts) // json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする

	// ------------------- イイね数の取得 ---------------------------
	SumLikesCount := service.SumLikesCount(Posts)
	fmt.Println("SumLikesCount: " + strconv.Itoa(SumLikesCount))

	// ------------------- 活動頻度取得 ---------------------------
	ActivetyCount := service.ComputeQiitaActivety(Posts)
	fmt.Println("ActivetyCount: " + strconv.Itoa(ActivetyCount))

	// ------------------- スコア計算 --------------------------
	fmt.Println("-------------------------------------")
	QiitaScore := service.ComputeQiitaScore(ItemsCount, FollowersCount, SumLikesCount, ActivetyCount)
	fmt.Println("-------------------------------------")
	fmt.Println("QiitaScore: " + strconv.Itoa(QiitaScore))
	fmt.Println("-------------------------------------")

	// template
	// c.HTML(http.StatusOK, "qiita.tmpl", gin.H{
	// 	"title":          "Qiita Score",
	// 	"ItemsCount":     ItemsCount,
	// 	"FollowersCount": FollowersCount,
	// 	"SumLikesCount":  SumLikesCount,
	// 	"ActivetyCount":  ActivetyCount,
	// 	"QiitaScore":     QiitaScore,
	// })

	// SPA
	http.SetCookie(c.Writer, &http.Cookie{
		Name:   "qiita",
		Value:  strconv.Itoa(QiitaScore),
		MaxAge: 1000 * 60 * 60 * 60 * 24 * 7,
	})

	c.Redirect(http.StatusMovedPermanently, "/")
}
