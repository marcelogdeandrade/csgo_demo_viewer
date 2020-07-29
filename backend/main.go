package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
	"github.com/marcelogdeandrade/csgo_demo_viewer/auth"
	"github.com/marcelogdeandrade/csgo_demo_viewer/controllers"
	"github.com/marcelogdeandrade/csgo_demo_viewer/models"
)

func main() {
	r := gin.Default()
	sess := controllers.CreateAwsSession()
	authMiddleware, err := auth.GetAuthMiddleWare()

	if err != nil {
		log.Fatal("JWT Error:" + err.Error())
	}

	models.ConnectDataBase()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin"}
	config.AllowMethods = []string{"GET", "POST"}

	r.Use(cors.New(config))
	r.Use(cors.Default())

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
			contentLength, contentType, file, extraHeaders, err := controllers.GetDemo(c, sess, userID)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "demo not round"})
			}
			c.DataFromReader(200, contentLength, contentType, file, extraHeaders)
		})

		authGroup.POST("/upload_demo", func(c *gin.Context) {
			userID, err := auth.VerifyToken(c)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "token error"})
			}
			controllers.UploadDemo(c, sess, userID)
			c.JSON(200, gin.H{
				"status":  "200",
				"message": "uploaded",
			})
		})
	}

	r.POST("/signup", controllers.SignUp)
	r.POST("/login", authMiddleware.LoginHandler)

	r.Run()
}
