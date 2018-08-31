package main

import (
	"tutorial/router"
)

func main() {
	router := router.GetRouter()
	router.Run(":8081")
}
