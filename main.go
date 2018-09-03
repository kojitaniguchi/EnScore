package main

import (
	"kyotohack2018-api/router"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	router := router.GetRouter()
	router.Run(":8081")
}
