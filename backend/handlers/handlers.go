package handlers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

type RApi struct {
	Version string `json:"version"`
	Name    string `json:"name"`
}

func GetVersion(c *gin.Context) {
	rapi := &RApi{
		Version: "0.1.0",
		Name:    "seqR",
	}
	c.JSON(http.StatusOK, rapi)
}

// Funciton to parse file submissions from the DESeq data entry
func SubmitDeseqData(c *gin.Context) {
	// We get the DESeq Formula
	formula := c.PostForm("formula")
	if formula == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DESeq formula is required"})
		return
	}

	// We get the Counts Matrix file
	countsFile, err := c.FormFile("counts")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Counts file upload failed or file is missing"})
		return
	}

	// We get the Metadata file
	metadataFile, err := c.FormFile("metadata")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Metadata file upload failed or file is missing"})
		return
	}

	// TODO: This is just a job simulation, wire into a real pipeline the submission
	// actually works

	// We create a unique job directory based on the current timestamp
	jobID := time.Now().Format("20060102-150405")
	// Since we are in a docker container we need to use the tmp_data
	// directory since the appuser has read/write permissions
	const tmpDirPath = "/tmp_data"
	savePath := filepath.Join(tmpDirPath, jobID)

	// We create the directory if it doesn't exist
	if err := os.MkdirAll(savePath, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to set up job folder"})
		return
	}

	// We save the files to the job directory
	countsSavePath := filepath.Join(savePath, countsFile.Filename)
	if err := c.SaveUploadedFile(countsFile, countsSavePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save counts file"})
		return
	}
	metadataSavePath := filepath.Join(savePath, metadataFile.Filename)
	if err := c.SaveUploadedFile(metadataFile, metadataSavePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save metadata file"})
		return
	}

	// Debugging
	fmt.Printf("\nDESeq Job %s Created: \n", jobID)
	fmt.Printf("Formula: %s\n", formula)
	fmt.Printf("Counts Saved To: %s\n", countsSavePath)
	fmt.Printf("Metadata Saved To: %s\n", metadataSavePath)

	// We can return out all the information
	c.JSON(http.StatusOK, gin.H{
		"message": "DESeq configuration submitted successfully",
		"jobId":   jobID,
		"formula": formula,
		"files":   []string{countsFile.Filename, metadataFile.Filename},
	})
}
