package controllers

import (
	"bytes"
	"encoding/json"
	"errors"
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
func UploadDemo(c *gin.Context, sess *session.Session, userID uint) {
	// single file
	file, _ := c.FormFile("file")

	// Demo Date
	date := c.PostForm("date")
	fmt.Println(date)

	// Open file
	src, err := file.Open()
	parser.CheckError(err)
	defer src.Close()

	// Parse file
	match := parser.Parse(src)

	// Save match on db
	matchID := uuid.New().String()
	db.SaveMatch(match, matchID, userID, date)

	// Transform to JSON
	framesJSON, err := json.Marshal(match)
	compressedFile := compressFile(framesJSON)
	parser.CheckError(err)
	r := bytes.NewReader(compressedFile.Bytes())

	// Upload result to S3
	UploadFile(matchID, r, sess)
}

// GetDemo function
func GetDemo(c *gin.Context, sess *session.Session, userID uint) (int64, string, *os.File, map[string]string, error) {
	var demo models.Match
	filename := c.Param("file")
	recordNotFound := models.DB.Where("user_id = ? AND demo_path = ?", userID, filename).First(&demo).RecordNotFound()
	if recordNotFound {
		return 0, "", nil, nil, errors.New("no demo found")
	}
	file := DownloadFile(filename, sess)
	fil, _ := file.Stat()
	contentLength := fil.Size()
	contentType := "application/gzip"
	extraHeaders := map[string]string{
		"Content-Disposition": fmt.Sprintf(`attachment; filename="%s"`, filename),
		"Content-Encoding":    "gzip",
	}
	return contentLength, contentType, file, extraHeaders, nil
}

// ListDemos function
func ListDemos(c *gin.Context, userID uint) []models.Match {
	var matches []models.Match
	models.DB.Where("user_id = ?", userID).Find(&matches)
	return matches
}

// RemoveDemo function
func RemoveDemo(c *gin.Context, userID uint) error {
	var demo models.Match
	filename := c.Param("file")
	query := models.DB.Where("user_id = ? AND demo_path = ?", userID, filename).First(&demo)
	if query.RecordNotFound() {
		return errors.New("no demo found")
	}
	models.DB.Delete(&demo)
	return nil
}
