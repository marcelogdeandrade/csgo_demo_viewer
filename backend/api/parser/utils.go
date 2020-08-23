package parser

import (
	"io"
	"strconv"

	models "github.com/marcelogdeandrade/csgo_demo_viewer/parser/models"
	dem "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs"
	common "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs/common"
	events "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs/events"
)

// CheckError function
func CheckError(err error) {
	if err != nil {
		panic(err.Error())
	}
}

// OpenDemo function
func OpenDemo(f io.Reader) (p dem.Parser) {
	p = dem.NewParser(f)
	return
}

// AdjustFrameIndex function
func AdjustFrameIndex(frame int, factor int) int {
	return (frame / factor)
}

// GetRoundTime function
func GetRoundTime(gameState dem.GameState) int {
	roundtime, _ := strconv.ParseFloat(gameState.ConVars()["mp_roundtime_defuse"], 64)
	return int(roundtime * 60)
}

// TranslateTeamStruct function
func TranslateTeamStruct(team common.Team) models.TeamSide {
	switch team {
	case common.TeamTerrorists:
		return models.TeamTerrorists
	case common.TeamCounterTerrorists:
		return models.TeamCounterTerrorists
	default:
		return models.Unknown
	}
}

// TranslateRoundEndReason function
func TranslateRoundEndReason(reason events.RoundEndReason) models.RoundEndReason {
	switch reason {
	case events.RoundEndReasonTargetBombed:
		return models.RoundEndReasonTargetBombed
	case events.RoundEndReasonCTWin:
		return models.RoundEndReasonCTWin
	case events.RoundEndReasonTerroristsWin:
		return models.RoundEndReasonTerroristsWin
	case events.RoundEndReasonBombDefused:
		return models.RoundEndReasonBombDefused
	case events.RoundEndReasonTargetSaved:
		return models.RoundEndReasonTargetSaved
	default:
		return models.Other
	}

}
