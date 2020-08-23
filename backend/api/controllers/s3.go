package controllers

import (
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/google/uuid"
	"github.com/marcelogdeandrade/csgo_demo_viewer/utils"
)

// CreateAwsSession function
func CreateAwsSession() (sess *session.Session) {
	sess, _ = session.NewSession(&aws.Config{
		Region: aws.String("sa-east-1")},
	)
	return
}

// GetFileURL function
func GetFileURL(sess *session.Session) (string, string, error) {
	bucket := "csdemos-raw"
	matchID := uuid.New().String()

	// Create S3 service client
	svc := s3.New(sess)

	req, _ := svc.PutObjectRequest(&s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(matchID),
	})

	str, err := req.Presign(15 * time.Minute)
	return matchID, str, err
}

// DownloadFile function
func DownloadFile(key string, sess *session.Session) string {
	//Temp
	bucket := "csgo-demo-viewer"

	svc := s3.New(sess)

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key + ".gz"),
	})
	urlStr, err := req.Presign(15 * time.Minute)
	utils.CheckError(err)

	return urlStr
}
