package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"tutorial/api"
	"tutorial/model"
	"tutorial/service/github"
)

// GithubCallbackのAPIリクエストについて
// 1. githubの access_toke 取得の postリクエスト には カスタムheader をつける必要がある。
// 2. http.Post ではなく http.NewRequest を使う必要がある。(http.Postにはカスタムheaderをつけることができない)

// GithubCallback : /github/callback でaccesstokenを取得する controller
func GithubCallback(c *gin.Context) {
	apiName := "github"

	// ----------------- AccessToke取得 --------------------------
	body := api.CreateCodeBody(c, apiName)
	byteArrayAccessToken := api.RequestAccessToken(body, apiName) // AccessTokenの取得

	var data model.GithubCredentialData
	json.Unmarshal(byteArrayAccessToken, &data)
	token := data.AccessToken
	fmt.Println("Github AccessToken: " + token)

	// ------------------- User情報取得 ---------------------------
	byteArrayUserData := api.RequestAuthorizedData("/user", token, apiName)
	var UserData model.GithubUserData            // model UserData
	json.Unmarshal(byteArrayUserData, &UserData) // json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする
	fmt.Println("UserData: " + UserData.Login)

	// ------------------- Repositry情報取得 ----------------------
	byteArrayRepos := api.RequestAuthorizedData("/user/repos", token, apiName)
	var Repos model.Repos // model Repos
	json.Unmarshal(byteArrayRepos, &Repos)
	fmt.Println("Repos: " + strconv.Itoa(len(Repos)))

	// ------------------- start総数計算 --------------------------
	startCount := service.SumStarCount(Repos)
	fmt.Println("startCount: " + strconv.Itoa(startCount))

	// ------------------- activety取得 --------------------------
	userName := UserData.Login
	activetyCount := service.ScrapingActivety(userName)
	fmt.Println("activetyCount: " + strconv.Itoa(activetyCount))

	// ------------------- スコア計算 --------------------------
	score := service.ScoreGithub(startCount, activetyCount)
	fmt.Println("githubScore: " + strconv.Itoa(score))

	c.Redirect(http.StatusMovedPermanently, "/")
}
