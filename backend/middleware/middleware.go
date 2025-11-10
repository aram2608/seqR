package middleware

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

var masterAPIKey string

func init() {
	masterAPIKey = os.Getenv("MASTER_API_KEY")
	if masterAPIKey == "" {
		log.Fatal("MASTER_API_KEY environment variable not set. Exiting.")
	}
}

func APIKeyAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		// If there is not auth header or if there is no Bearer
		// we error out since its an unauthorized request
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "API Key is required in Authorization"})
			return
		}
		// We can get our client key now
		clientKey := strings.TrimPrefix(authHeader, "Bearer ")

		// If the keys dont match we error out
		if clientKey != masterAPIKey {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid API key"})
			return
		}

		// We go to the next handler
		c.Next()
	}
}
