package db

import "github.com/marcelogdeandrade/csgo_demo_viewer/models"

// SaveMatch function
func SaveMatch(mapName string, demoPatch string) {
	match := models.Match{Map: mapName, DemoPath: demoPatch}
	models.DB.Create(&match)
}
