package controllers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/marcelogdeandrade/csgo_demo_viewer/models"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 5)
	return string(bytes), err
}

func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// SignUp function
func SignUp(c *gin.Context) {
	var input models.Account
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Username == "" || input.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fields missing"})
		return
	}

	passwordHash, err := hashPassword(input.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create Account
	account := models.Account{Username: input.Username, Password: passwordHash}
	db := models.DB.Create(&account)

	if db.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": db.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": account})
}

// Login function
func Login(c *gin.Context) (interface{}, error) {
	var input models.Account

	if err := c.ShouldBindJSON(&input); err != nil {
		return nil, err
	}

	if input.Username == "" || input.Password == "" {
		return nil, errors.New("empty")
	}

	var account models.Account
	if err := models.DB.Where("username = ?", input.Username).First(&account).Error; err != nil {
		return nil, err
	}

	if !checkPasswordHash(input.Password, account.Password) {
		return nil, errors.New("hash error")
	}
	return account, nil
}
