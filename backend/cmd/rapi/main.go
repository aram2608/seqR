package main

import (
	"log"
	"net/http"
	"rapi/handlers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// We create the gin router
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost", "http://127.0.0.1", "http://localhost:80"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// The react app can see api through the proxy
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "pong"})
	})

	// We get the form data from the frontend
	r.POST("/deseq/submit", handlers.SubmitDeseqConfig)

	// We try to run on local host
	err := r.Run(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
