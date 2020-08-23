package controllers

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sqs"
)

// SendMessage function
func SendMessage(sess *session.Session, matchID string) error {
	svc := sqs.New(sess)

	queueURL := os.Getenv("SQS_QUEUE_URL")
	sendParams := &sqs.SendMessageInput{
		MessageBody: aws.String(matchID),
		QueueUrl:    aws.String(queueURL),
	}

	_, err := svc.SendMessage(sendParams)
	if err != nil {
		return err
	}
	return nil
}
