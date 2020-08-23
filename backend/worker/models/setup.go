package models

import (
	"os"

	"github.com/jinzhu/gorm"

	// Postgres
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DB var
var DB *gorm.DB

// ConnectDataBase function
func ConnectDataBase() {
	dbConfig := os.Getenv("DB_CONFIG")
	database, err := gorm.Open("postgres", dbConfig)

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&Match{})

	DB = database
}
