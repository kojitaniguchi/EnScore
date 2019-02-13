package controller

import (
	"encoding/json"
	"fmt"
	"kyotohack2018-api/api"
	"kyotohack2018-api/model"
	service "kyotohack2018-api/service/github"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
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
	fmt.Println("-------------------------------------")
	fmt.Println("Github AccessToken: " + token)

	// ------------------- User情報取得 ---------------------------
	byteArrayUserData := api.RequestAuthorizedData("/user", token, apiName)
	var UserData model.GithubUserData            // model UserData
	json.Unmarshal(byteArrayUserData, &UserData) // json.Unmarshalは、構造体のjsonタグがあればその値を対応するフィールドにマッピングする

	// ------------------- Repositry情報取得 ----------------------
	byteArrayRepos := api.RequestAuthorizedData("/user/repos", token, apiName)
	var Repos model.Repos // model Repos
	json.Unmarshal(byteArrayRepos, &Repos)

	// ------------------- start総数計算 --------------------------
	fmt.Println("-------------------------------------")
	startCount := service.SumStarCount(Repos)
	fmt.Println("startCount: " + strconv.Itoa(startCount))

	// ------------------- activety取得 --------------------------
	userName := UserData.Login
	activetyCount := service.ScrapingActivety(userName)
	fmt.Println("activetyCount: " + strconv.Itoa(activetyCount))

	// ------------------- スコア計算 --------------------------
	fmt.Println("-------------------------------------")
	githubScore := service.ComputeScoreGithub(startCount, activetyCount)
	fmt.Println("-------------------------------------")
	fmt.Println("githubScore: " + strconv.Itoa(githubScore))
	fmt.Println("-------------------------------------")

	// template
	// c.HTML(http.StatusOK, "github.tmpl", gin.H{
	// 	"title":         "Github Score",
	// 	"startCount":    startCount,
	// 	"activetyCount": activetyCount,
	// 	"githubScore":   githubScore,
	// })

	// SPA
	http.SetCookie(c.Writer, &http.Cookie{
		Name:  "github",
		Value: strconv.Itoa(githubScore),
	})
	c.SetCookie(
		"token",
		"testtoken",
		3600,
		"/",
		"127.0.0.1",
		false,
		false,
	)

	c.Redirect(http.StatusFound, "/")
	// http.Redirect(c.Writer, r, "/", http.StatusFound)
}
