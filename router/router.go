package router

import (
	"kyotohack2018-api/controller"

	"github.com/gin-gonic/gin"
)

// GetRouter 全てのルーターをまとめる top router
func GetRouter() *gin.Engine {
	router := gin.Default()

	router.LoadHTMLGlob("views/*.tmpl")

	router.GET("/", controller.TemplateHandler)
	router.GET("/alive", controller.AliveCheck)

	router.GET("/github/callback", controller.GithubCallback)
	router.GET("/qiita/callback", controller.QiitaCallback)

	return router
}
