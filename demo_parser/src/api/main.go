package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	sess := CreateAwsSession()
	r.POST("/upload_demo", func(c *gin.Context) {
		UploadFile(c, sess)
		c.JSON(200, gin.H{
			"status":  "200",
			"message": "uploaded",
		})
	})
	r.GET("/get_demo/:file", func(c *gin.Context) {
		filename := c.Param("file")
		file := DownloadFile(filename, sess)
		fil, _ := file.Stat()
		contentLength := fil.Size()
		contentType := "application/json"
		extraHeaders := map[string]string{
			"Content-Disposition": `attachment; filename="teste3.json"`,
		}
		c.DataFromReader(200, contentLength, contentType, file, extraHeaders)
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
