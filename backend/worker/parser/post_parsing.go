package parser

import (
	models "github.com/marcelogdeandrade/csgo-demo-parser/parser/models"
)

//PostParsingAdjustments function
func PostParsingAdjustments(match *models.Match) {
	calcRounds(match)
	calcFreezetimeRound(match)
	calcIsFreezetime(match)
	calcGrenadeExplosions(match)
	calcFrameTime(match)
	calcScores(match)
	calcRoundEndWinner(match)
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
			if match.Frames[idx].IsFreezeTime {
				match.Frames[idx].Time = roundTime
			} else {
				freezetimeEndFrame := rounds[currentRound].FreezetimeFrame
				frameTime := roundTime - (match.Frames[idx].TimeElapsed - match.Frames[freezetimeEndFrame].TimeElapsed)
				if frameTime < 0 {
					frameTime = 0
				}
				match.Frames[idx].Time = frameTime
			}
		}
	}
}

func calcScores(match *models.Match) {
	scores := match.Scores
	for idx := range match.Frames {
		currentScores := getCurrentScore(idx, scores)
		match.Frames[idx].CounterTerrorists.Score = currentScores[match.Frames[idx].CounterTerrorists.ID]
		match.Frames[idx].Terrorists.Score = currentScores[match.Frames[idx].Terrorists.ID]
	}
}

func getCurrentScore(currentFrame int, scores []models.Score) (currentScores map[int]int) {
	currentScores = make(map[int]int)
	for _, score := range scores {
		if score.Frame > currentFrame {
			return
		}
		currentScores[score.TeamID] = score.Value
	}
	return
}

func calcFreezetimeRound(match *models.Match) {
	for roundIdx := range match.Rounds {
		roundStartFrame := match.Rounds[roundIdx].Frame
		for freezetimeIdx := range match.Freezetimes {
			if match.Freezetimes[freezetimeIdx].Frame > roundStartFrame {
				match.Rounds[roundIdx].FreezetimeFrame = match.Freezetimes[freezetimeIdx].Frame
				break
			}
		}
	}
}

func calcIsFreezetime(match *models.Match) {
	rounds := match.Rounds
	for idx := range match.Frames {
		currentRound := match.Frames[idx].Round
		if currentRound >= 0 {
			isFreezetime := getIsFreezetime(idx, rounds[currentRound])
			match.Frames[idx].IsFreezeTime = isFreezetime
		}
	}
}

func getIsFreezetime(currentFrame int, currentRound models.Round) bool {
	if currentFrame < currentRound.FreezetimeFrame {
		return true
	}
	return false
}

func calcRoundEndWinner(match *models.Match) {
	rounds := match.Rounds
	roundEnds := match.RoundEnds
	for idxRounds := range rounds {
		for idxRoundEnds := range roundEnds {
			if roundEnds[idxRoundEnds].Frame > rounds[idxRounds].Frame {
				match.Rounds[idxRounds].Winner = roundEnds[idxRoundEnds].Winner
				match.Rounds[idxRounds].RoundEndReason = roundEnds[idxRoundEnds].Reason
				break
			}
		}
	}
}
