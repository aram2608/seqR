package handlers

import (
	"github.com/gin-gonic/gin"
)

type RApi struct {
	Version string `json:"version"`
	Number  int    `json:"numer"`
}

func GetRoot(c *gin.Context) {

}
