package controllers

import (
	"bytes"
	"compress/gzip"
	"context"
	"fmt"
	"io"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/google/uuid"
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
		Bucket:          aws.String(bucket),
		Key:             aws.String(filename + ".gz"),
		ContentEncoding: aws.String("gzip"),
		Body:            f,
	})

	parser.CheckError(err)
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

// DownloadRawDemo function
func DownloadRawDemo(matchID string, sess *session.Session) []byte {
	bucket := "csdemos-raw"
	buff := &aws.WriteAtBuffer{}

	downloader := s3manager.NewDownloader(sess)

	ctx := context.Background()
	_, err := downloader.DownloadWithContext(ctx, buff,
		&s3.GetObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(matchID),
		})
	parser.CheckError(err)

	test := string(buff.Bytes()[0:100])
	fmt.Println(test)
	return buff.Bytes()
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
	parser.CheckError(err)

	return urlStr
}

func compressFile(jsonBytes []byte) bytes.Buffer {
	var b bytes.Buffer
	w := gzip.NewWriter(&b)
	w.Write(jsonBytes)
	w.Close()
	return b
}
