package controllers

import (
	"errors"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/gin-gonic/gin"
	"github.com/marcelogdeandrade/csgo_demo_viewer/db"
	"github.com/marcelogdeandrade/csgo_demo_viewer/models"
	"github.com/marcelogdeandrade/csgo_demo_viewer/parser"
)

// ProcessDemo function
func ProcessDemo(c *gin.Context, sess *session.Session, userID uint) error {
	matchID := c.PostForm("match_id")
	date := c.PostForm("date")

	// // Download From S3
	// file := DownloadRawDemo(matchID, sess)

	// Parse file
	// match := parser.Parse(bytes.NewReader(file))

	// Save match on db
	db.SaveMatch(matchID, userID, date)

	err := SendMessage(sess, matchID)
	if err != nil {
		return err
	}
	return nil

	// Transform to JSON
	// framesJSON, err := json.Marshal(match)
	// compressedFile := compressFile(framesJSON)
	// parser.CheckError(err)
	// r := bytes.NewReader(compressedFile.Bytes())

	// // Upload result to S3
	// UploadFile(matchID, r, sess)
}

// GetUploadDemoURL function
func GetUploadDemoURL(c *gin.Context, sess *session.Session) (string, string) {
	matchID, url, err := GetFileURL(sess)
	parser.CheckError(err)
	return matchID, url
}

// GetDemo function
func GetDemo(c *gin.Context, sess *session.Session, userID uint) (string, error) {
	var demo models.Match
	filename := c.Param("file")
	recordNotFound := models.DB.Where("user_id = ? AND demo_path = ?", userID, filename).First(&demo).RecordNotFound()
	if recordNotFound {
		return "", errors.New("no demo found")
	}
	url := DownloadFile(filename, sess)
	return url, nil
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
