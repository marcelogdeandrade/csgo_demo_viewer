package controllers

import (
	"bytes"
	"compress/gzip"
	"context"
	"io"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/joho/godotenv"
	"github.com/marcelogdeandrade/csgo_demo_viewer/parser"
)

// CreateAwsSession function
func CreateAwsSession() (sess *session.Session) {
	err := godotenv.Load()
	parser.CheckError(err)
	accessKey := os.Getenv("AWS_ACCESS_KEY_ID")
	secretKey := os.Getenv("AWS_SECRET_ACCESS_KEY")
	sess, _ = session.NewSession(&aws.Config{
		Region:      aws.String("sa-east-1"),
		Credentials: credentials.NewStaticCredentials(accessKey, secretKey, "")},
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

func compressFile(jsonBytes []byte) bytes.Buffer {
	var b bytes.Buffer
	w := gzip.NewWriter(&b)
	w.Write(jsonBytes)
	w.Close()
	return b
}
