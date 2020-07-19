package controllers

import (
	"context"
	"io"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"

	"github.com/marcelogdeandrade/csgo_demo_viewer/parser"
)

// CreateAwsSession function
func CreateAwsSession() (sess *session.Session) {
	sess, _ = session.NewSession(&aws.Config{
		Region: aws.String("sa-east-1")},
	)
	return
}

// UploadFile function
func UploadFile(filename string, f io.ReadSeeker, sess *session.Session) {
	//Temp
	bucket := "csgo-demo-viewer"

	// Upload to S3
	svc := s3.New(sess)

	ctx := context.Background()
	_, err := svc.PutObjectWithContext(ctx, &s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(filename),
		Body:   f,
	})

	parser.CheckError(err)
}

// DownloadFile function
func DownloadFile(key string, sess *session.Session) *os.File {
	//Temp
	bucket := "csgo-demo-viewer"

	// Download from S3
	file, err := os.Create(key)

	downloader := s3manager.NewDownloader(sess)

	_, err = downloader.Download(file,
		&s3.GetObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(key),
		})
	parser.CheckError(err)
	return file
}
