package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type RApi struct {
	Version string `json:"version"`
	Name    string `json:"name"`
}

func GetRoot(c *gin.Context) {
	rapi := &RApi{
		Version: "0.1.0",
		Name:    "seqR",
	}

	c.JSON(http.StatusOK, rapi)
}
