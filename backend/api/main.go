package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
	"github.com/marcelogdeandrade/csgo_demo_viewer/auth"
	"github.com/marcelogdeandrade/csgo_demo_viewer/controllers"
	"github.com/marcelogdeandrade/csgo_demo_viewer/models"

	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
)

var ginLambda *ginadapter.GinLambda
var r *gin.Engine

func init() {
	r = gin.Default()
	sess := controllers.CreateAwsSession()
	authMiddleware, err := auth.GetAuthMiddleWare()

	if err != nil {
		log.Fatal("JWT Error:" + err.Error())
	}

	models.ConnectDataBase()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://front.marcelao.com.br", "https://csdemos.com", "http://csdemos.com"}
	config.AllowCredentials = true
	config.AllowHeaders = []string{"Origin"}
	config.AllowMethods = []string{"GET", "POST", "DELETE"}

	r.Use(cors.New(config))

	authGroup := r.Group("/auth")
	authGroup.Use(authMiddleware.MiddlewareFunc())
	{
		authGroup.GET("/demos", func(c *gin.Context) {
			userID, err := auth.VerifyToken(c)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "token error"})
			}
			demos := controllers.ListDemos(c, userID)
			c.JSON(http.StatusOK, gin.H{"data": demos})
		})
		authGroup.GET("/get_demo/:file", func(c *gin.Context) {
			userID, err := auth.VerifyToken(c)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "token error"})
			}
			url, err := controllers.GetDemo(c, sess, userID)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "demo not round"})
			}
			c.JSON(200, gin.H{
				"status":   "200",
				"demo_url": url,
			})
		})

		authGroup.GET("/upload_demo", func(c *gin.Context) {
			_, err := auth.VerifyToken(c)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "token error"})
			}
			matchID, url := controllers.GetUploadDemoURL(c, sess)
			c.JSON(200, gin.H{
				"status":     "200",
				"upload_url": url,
				"match_id":   matchID,
			})
		})

		authGroup.POST("/upload_demo", func(c *gin.Context) {
			userID, err := auth.VerifyToken(c)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "token error"})
			}
			err = controllers.ProcessDemo(c, sess, userID)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			}
			c.JSON(200, gin.H{
				"status":  "200",
				"message": "uploaded",
			})
		})
		authGroup.DELETE("/remove_demo/:file", func(c *gin.Context) {
			userID, err := auth.VerifyToken(c)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "token error"})
			}
			err = controllers.RemoveDemo(c, userID)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "delete error"})
			}
			c.JSON(200, gin.H{
				"status":  "200",
				"message": "deleted",
			})
		})
	}

	r.POST("/signup", controllers.SignUp)
	r.POST("/login", authMiddleware.LoginHandler)

	ginLambda = ginadapter.New(r)
}

// Handler Function
func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// If no name is provided in the HTTP request body, throw an error
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	appEnv := os.Getenv("APP_ENV")
	if appEnv == "production" {
		lambda.Start(Handler)
	} else {
		r.Run(":8080")
	}
}
