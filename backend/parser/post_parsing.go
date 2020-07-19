package parser

import (
	models "github.com/marcelogdeandrade/csgo_demo_viewer/parser/models"
)

//PostParsingAdjustments function
func PostParsingAdjustments(match *models.Match) {
	calcRounds(match)
	calcGrenadeExplosions(match)
	calcFrameTime(match)
}

func calcRounds(match *models.Match) {
	for idx := range match.Frames {
		round := getRound(match.Rounds, idx)
		match.Frames[idx].Round = round
	}
}

func getRound(rounds []models.Round, currentFrame int) int {
	for idx := range rounds {
		if idx < len(rounds)-1 {
			min := rounds[idx].Frame
			max := rounds[idx+1].Frame
			if currentFrame < min {
				return -1
			}
			if currentFrame > min && currentFrame < max {
				return idx
			}
		}
	}
	return len(rounds) - 1
}

func calcGrenadeExplosions(match *models.Match) {
	for idx := range match.Frames {
		for grenadeIdx := range match.Frames[idx].Grenades {
			grenade := match.Frames[idx].Grenades[grenadeIdx]
			explosion := getIsExploded(grenade, match.GrenadeExplosions, idx)
			match.Frames[idx].Grenades[grenadeIdx].Exploded = explosion
		}
	}
}

func getIsExploded(grenade models.Grenade, explosions []models.GrenadeExplosion, currentFrame int) bool {
	for idx := range explosions {
		if explosions[idx].GrenadeID == grenade.ID {
			if explosions[idx].Frame <= currentFrame {
				return true
			}
		}
	}
	return false
}

func calcFrameTime(match *models.Match) {
	rounds := match.Rounds
	for idx := range match.Frames {
		currentRound := match.Frames[idx].Round
		if currentRound >= 0 {
			roundTime := rounds[currentRound].StartTime
			startRoundFrameTime := match.Frames[rounds[currentRound].Frame].Time
			frameTime := roundTime - (match.Frames[idx].Time - startRoundFrameTime)
			match.Frames[idx].Time = frameTime
		}
	}
}
