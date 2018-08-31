package controller

import (
	"github.com/gin-gonic/gin"
)

// AliveCheck サーバーの生存チェック
func AliveCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"alive": true,
	})
}
