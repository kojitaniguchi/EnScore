package main

import (
	"kyotohack2018-api/router"
	"os"
)

func main() {
	router := router.GetRouter()
	router.Run(":" + os.Getenv("PORT"))
}
