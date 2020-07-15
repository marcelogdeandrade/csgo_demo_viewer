package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/request"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gin-gonic/gin"
)

// CreateAwsSession function
func CreateAwsSession() (sess *session.Session) {
	sess, _ = session.NewSession(&aws.Config{
		Region: aws.String("sa-east-1")},
	)
	return
}

// UploadFile function
func UploadFile(c *gin.Context, sess *session.Session) {
	//Temp
	bucket := "csgo-demo-viewer"

	// single file
	file, _ := c.FormFile("file")
	log.Println(file.Filename)

	// Open file
	src, err := file.Open()
	if err != nil {
		panic(err)
	}
	defer src.Close()

	// Upload to S3
	svc := s3.New(sess)
	ctx := context.Background()
	_, err = svc.PutObjectWithContext(ctx, &s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(file.Filename),
		Body:   src,
	})

	// Upload error
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok && aerr.Code() == request.CanceledErrorCode {
			// If the SDK can determine the request or retry delay was canceled
			// by a context the CanceledErrorCode error code will be returned.
			fmt.Fprintf(os.Stderr, "upload canceled due to timeout, %v\n", err)
		} else {
			fmt.Fprintf(os.Stderr, "failed to upload object, %v\n", err)
		}
		os.Exit(1)
	}

	fmt.Printf("successfully uploaded file to %s/%s\n", bucket, file.Filename)
}

// DownloadFile function
func DownloadFile(key string, sess *session.Session) *os.File {
	//Temp
	bucket := "csgo-demo-viewer"

	file, err := os.Create(key)

	downloader := s3manager.NewDownloader(sess)

	numBytes, err := downloader.Download(file,
		&s3.GetObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(key),
		})
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Downloaded", file.Name(), numBytes, "bytes")
	return file
}
