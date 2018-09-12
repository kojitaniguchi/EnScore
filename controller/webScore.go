package controller

import (
	"fmt"
	service "kyotohack2018-api/service/webScore"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// WebSocreHandler : /web/socre urlを元にlighthouseを使ってスコアを算出
func WebSocreHandler(c *gin.Context) {
	url := c.PostForm("url")
	// ---------------- lighthouse scoreの取得 ---------------
	results := service.ExecLighthouse(url)
	fmt.Println(results[0].RequestedURL)

	// ---------------- webScoreの算出 -----------------------
	ComputedResults := service.ComputeWebScore(results)

	//template
	c.HTML(http.StatusOK, "webScore.tmpl", gin.H{
		"title":           "web Score",
		"ComputedResults": ComputedResults,
	})

	// SPA
	http.SetCookie(c.Writer, &http.Cookie{
		Name: "webScore", Value: strconv.Itoa(ComputedResults[0].Score), MaxAge: 1000 * 60 * 60 * 60 * 24 * 7,
	})
	c.Redirect(http.StatusMovedPermanently, "/")

}
