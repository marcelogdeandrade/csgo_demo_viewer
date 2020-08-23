package models

// Account model
type Account struct {
	ID       uint   `gorm:"primary_key" json:"id"`
	Username string `gorm:"unique" json:"username"`
	Password string `json:"password"`
}
