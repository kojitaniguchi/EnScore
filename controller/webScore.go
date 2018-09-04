package controller

import (
	"fmt"
	service "kyotohack2018-api/service/webScore"
	"net/http"

	"github.com/gin-gonic/gin"
)

// WebSocreHandler : /web/socre urlを元にlighthouseを使ってスコアを算出
func WebSocreHandler(c *gin.Context) {
	// ---------------- scoreの取得 ---------------
	results := service.ExecLighthouse()
	fmt.Println(results[0].RequestedURL)

	c.HTML(http.StatusOK, "github.tmpl", gin.H{
		"title": "web Score",
	})
}
