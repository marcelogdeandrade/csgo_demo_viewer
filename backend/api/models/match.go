package models

// Match model
type Match struct {
	ID                         uint   `json:"id" gorm:"primary_key"`
	UserID                     uint   `json:"user_id"`
	Map                        string `json:"map"`
	Date                       string `json:"date"`
	DemoPath                   string `json:"demo_path"`
	TerroristName              string `json:"tr_name"`
	CounterTerroristName       string `json:"ct_name"`
	TerroristFinalScore        int    `json:"tr_final_score"`
	CounterTerroristFinalScore int    `json:"ct_final_score"`
}
