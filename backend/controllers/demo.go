package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/marcelogdeandrade/csgo_demo_viewer/db"
	"github.com/marcelogdeandrade/csgo_demo_viewer/models"
	"github.com/marcelogdeandrade/csgo_demo_viewer/parser"
)

// UploadDemo function
func UploadDemo(c *gin.Context, sess *session.Session) {
	// single file
	file, _ := c.FormFile("file")

	// Open file
	src, err := file.Open()
	parser.CheckError(err)
	defer src.Close()

	// Parse file
	match := parser.Parse(src)

	// Save match on db
	matchID := uuid.New().String()
	db.SaveMatch(match, matchID)

	// Transform to JSON
	framesJSON, err := json.Marshal(match)
	parser.CheckError(err)
	r := bytes.NewReader(framesJSON)

	// Upload result to S3
	UploadFile(matchID, r, sess)
}

// GetDemo function
func GetDemo(c *gin.Context, sess *session.Session) (int64, string, *os.File, map[string]string) {
	filename := c.Param("file")
	file := DownloadFile(filename, sess)
	fil, _ := file.Stat()
	contentLength := fil.Size()
	contentType := "application/json"
	extraHeaders := map[string]string{
		"Content-Disposition": fmt.Sprintf(`attachment; filename="%s"`, filename),
	}
	return contentLength, contentType, file, extraHeaders
}

// ListDemos function
func ListDemos(c *gin.Context) []models.Match {
	var matches []models.Match
	models.DB.Find(&matches)
	return matches
}
