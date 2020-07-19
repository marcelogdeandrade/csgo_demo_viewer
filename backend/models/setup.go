package models

import (
	"github.com/jinzhu/gorm"

	// Postgres
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DB var
var DB *gorm.DB

// ConnectDataBase function
func ConnectDataBase() {
	database, err := gorm.Open("postgres", "host=tuffi.db.elephantsql.com port=5432 user=uakosxpe dbname=uakosxpe password=o-Oko94vpxR1hgXXtRm07cu6PQwAXAP6")

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&Match{})

	DB = database
}
