package models

// Match model
type Match struct {
	ID       uint   `json:"id" gorm:"primary_key"`
	Map      string `json:"map"`
	DemoPath string `json:"demo_path"`
}
