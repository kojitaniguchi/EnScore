package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"tutorial/model"
	"tutorial/service/github"
)

// 1. githubの access_toke 取得の postリクエスト には カスタムheader をつける必要がある。
// 2. http.Post ではなく http.NewRequest を使う必要がある。(http.Postにはカスタムheaderをつけることができない)

// GithubCallback : /github/callback でaccesstokenを取得する controller
func GithubCallback(c *gin.Context) {

	// ----------------- AccessToke取得 --------------------------

	// code client_id client_secret を元にPOSTリクエストbodyを生成
	body := service.CreateCodeBody(c)
	data := service.RequestAccessToken(body) // AccessTokenの取得
	token := data.AccessToken
	fmt.Println("AccessToken: " + token)

	// ------------------- User情報取得 ---------------------------
	byteArrayUserData := service.RequestUserData("/user", token)
	var UserData model.UserData // model UserData
	json.Unmarshal(byteArrayUserData, &UserData)
	fmt.Println("UserData: " + UserData.Login)

	// ------------------- Repositry情報取得 ----------------------
	byteArrayRepos := service.RequestUserData("/user/repos", token)
	var Repos model.Repos // model Repos
	json.Unmarshal(byteArrayRepos, &Repos)
	fmt.Println("Repos: ")
	fmt.Println(len(Repos))

	// ------------------- start総数計算 --------------------------
	startCount := service.SumStarCount(Repos)
	fmt.Println("startCount: ")
	fmt.Println(startCount)

	c.Redirect(http.StatusMovedPermanently, "/")
}
