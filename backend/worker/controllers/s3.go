package controllers

import (
	"bytes"
	"compress/gzip"
	"context"
	"io"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/marcelogdeandrade/csgo-demo-parser/utils"
)

// CreateAwsSession function
func CreateAwsSession() (sess *session.Session) {
	sess, _ = session.NewSession(&aws.Config{
		Region: aws.String("sa-east-1")},
	)
	return
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
	utils.CheckError(err)
	return buff.Bytes()
}

func compressFile(jsonBytes []byte) bytes.Buffer {
	var b bytes.Buffer
	w := gzip.NewWriter(&b)
	w.Write(jsonBytes)
	w.Close()
	return b
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

	utils.CheckError(err)
}
