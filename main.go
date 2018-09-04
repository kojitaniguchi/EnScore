package main

import (
	"kyotohack2018-api/router"
)

func main() {
	router := router.GetRouter()
	router.Run(":8081")
}
