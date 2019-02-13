package main

import (
	"kyotohack2018-api/router"
)

func main() {
	// test
	router := router.GetRouter()
	// router.Run(":" + os.Getenv("PORT"))
	router.Run(":8082")
}
