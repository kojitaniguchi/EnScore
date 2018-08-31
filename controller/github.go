package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"

	"tutorial/service/github"
)

// 1. githubの access_toke 取得の postリクエスト には カスタムheader をつける必要がある。
// 2. http.Post ではなく http.NewRequest を使う必要がある。(http.Postにはカスタムheaderをつけることができない)

// GithubCallback : /github/callback でaccesstokenを取得する controller
func GithubCallback(c *gin.Context) {

	// ----------------- AccessToke取得 --------------------------

	githubAuthURL := "https://github.com/login/oauth/access_token"

	// code client_id client_secret を元にPOSTリクエストbodyを生成
	body := service.CreateCodeBody(c)
	data := service.RequestAccessToken(githubAuthURL, body)	// AccessTokenの取得

	fmt.Println(data.AccessToken)

	// ------------------- User情報取得 ---------------------------
	token := data.AccessToken
	query 
	data := service.RequestUserData(githubAuthURL, token, type)

	resp, err := http.Get("https://api.github.com/user?access_token=" + token)
	if err != nil {
		panic(err)
	}

	byteArray, _ := ioutil.ReadAll(resp.Body)
	var UserData UserData
	json.Unmarshal(byteArray, &UserData)
	return UserData.Login


	f := func() {
        fmt.Println("hello!")
    }
    call(f)

	c.Redirect(http.StatusMovedPermanently, "/")
}

UserData struct {
	// User User `json:"user"`
	Login string `json:"login"`
}

func call(f interface{}) {
    fv := reflect.ValueOf(f)
    if fv.Kind() != reflect.Func {
        panic("f must be func.")
    }
    fv.Call([]reflect.Value{})
}

