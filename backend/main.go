package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
	"github.com/marcelogdeandrade/csgo_demo_viewer/controllers"
	"github.com/marcelogdeandrade/csgo_demo_viewer/models"
)

func main() {
	r := gin.Default()
	sess := controllers.CreateAwsSession()

	models.ConnectDataBase()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin"}
	config.AllowMethods = []string{"GET", "POST"}
	r.Use(cors.New(config))

	r.Use(cors.Default())

	r.POST("/upload_demo", func(c *gin.Context) {
		controllers.UploadDemo(c, sess)
		c.JSON(200, gin.H{
			"status":  "200",
			"message": "uploaded",
		})
	})

	r.GET("/get_demo/:file", func(c *gin.Context) {
		contentLength, contentType, file, extraHeaders := controllers.GetDemo(c, sess)
		c.DataFromReader(200, contentLength, contentType, file, extraHeaders)
	})

	r.GET("/demos", func(c *gin.Context) {
		demos := controllers.ListDemos(c)
		c.JSON(http.StatusOK, gin.H{"data": demos})
	})

	r.Run()
}
