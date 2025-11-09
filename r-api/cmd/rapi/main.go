package main

import (
	"log"
	"rapi/handlers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// We create the gin router
	r := gin.Default()

	// We set up some CORS configs so our frontend and backend can
	// send requests
	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"http://localhost:8080"},
		AllowMethods:  []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:  []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders: []string{"Content-Length", "Authorization"},
		MaxAge:        12 * time.Hour,
	}))

	r.GET("/", handlers.GetRoot)

	// We try to run on local host
	err := r.Run(":8000")
	if err != nil {
		log.Fatal(err)
	}
}
