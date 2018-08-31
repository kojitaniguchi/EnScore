package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// TemplateHandler htmlファイルを返す
func TemplateHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.tmpl", gin.H{
		"a": "a",
	})
}
