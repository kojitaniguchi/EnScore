package router

import (
	"kyotohack2018-api/controller"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetRouter 全てのルーターをまとめる top router
func GetRouter() *gin.Engine {
	router := gin.Default()

	// template
	// router.LoadHTMLGlob("views/*.tmpl")
	// router.GET("/", controller.TemplateHandler)

	// spa
	router.Static("/javascript", "client/assets/javascript")
	router.LoadHTMLGlob("index.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.GET("/alive", controller.AliveCheck)

	router.GET("/github/callback", controller.GithubCallback)
	router.GET("/qiita/callback", controller.QiitaCallback)

	router.POST("/score/web", controller.WebSocreHandler)

	return router
}
