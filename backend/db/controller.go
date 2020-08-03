package db

import (
	"github.com/marcelogdeandrade/csgo_demo_viewer/models"
	parsermodels "github.com/marcelogdeandrade/csgo_demo_viewer/parser/models"
)

// SaveMatch function
func SaveMatch(match parsermodels.Match, matchID string, userID uint, date string) {
	mapName := match.MapName
	ctScore, trScore := getFinalScores(match)
	ctName, trName := getTeamNames(match)
	matchDB := models.Match{
		Map:                        mapName,
		DemoPath:                   matchID,
		TerroristName:              trName,
		Date:                       date,
		CounterTerroristName:       ctName,
		TerroristFinalScore:        trScore,
		CounterTerroristFinalScore: ctScore,
		UserID:                     userID,
	}
	models.DB.Create(&matchDB)
}

func getFinalScores(match parsermodels.Match) (ct int, tr int) {
	finalFrame := match.Scores[len(match.Scores)-1].Frame
	ct = match.Frames[finalFrame].CounterTerrorists.Score
	tr = match.Frames[finalFrame].Terrorists.Score
	return
}

func getTeamNames(match parsermodels.Match) (ct string, tr string) {
	finalFrame := match.Scores[len(match.Scores)-1].Frame
	ct = match.Frames[finalFrame].CounterTerrorists.Name
	tr = match.Frames[finalFrame].Terrorists.Name
	return
}
