package models

// Account model
type Account struct {
	ID           uint   `json:"id" gorm:"primary_key"`
	Username     string `json:"username"`
	PasswordHash string `json:"password"`
}
