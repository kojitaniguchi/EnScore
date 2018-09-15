package main

import (
	"kyotohack2018-api/router"
)

func main() {
	router := router.GetRouter()
	// router.Run(":" + os.Getenv("PORT"))
	router.Run(":8082")
}
