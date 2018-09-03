package main

import (
	"log"
	"tutorial/router"

	"github.com/joho/godotenv"
)

func main() {
	// dotenvの初期load
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	router := router.GetRouter()
	router.Run(":8081")
}
