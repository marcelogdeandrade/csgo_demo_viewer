package parser

import (
	models "github.com/marcelogdeandrade/csgo_demo_viewer/parser/models"
	dem "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs"
	events "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs/events"
)

// RegisterEventHandlers function
func RegisterEventHandlers(p dem.Parser, match *models.Match) {
	p.RegisterEventHandler(func(e events.RoundStart) {
		idx := AdjustFrameIndex(p.CurrentFrame(), match.FrameFactor)
		roundTime := GetRoundTime(p.GameState())
		if p.GameState().IsMatchStarted() {
			round := models.Round{
				StartTime: roundTime,
				Frame:     idx,
			}
			match.Rounds = append(match.Rounds, round)
		}
	})
	p.RegisterEventHandler(func(e events.Kill) {
		idx := AdjustFrameIndex(p.CurrentFrame(), match.FrameFactor)
		kill := models.Kill{
			Victim: e.Victim.Name,
			Killer: e.Killer.Name,
		}
		match.Frames[idx].Kills = append(match.Frames[idx].Kills, kill)
	})
	p.RegisterEventHandler(func(e events.SmokeStart) {
		idx := AdjustFrameIndex(p.CurrentFrame(), match.FrameFactor)
		grenade := e.Grenade
		grenadeExplosion := models.GrenadeExplosion{
			Frame:     idx,
			GrenadeID: grenade.UniqueID(),
		}
		match.GrenadeExplosions = append(match.GrenadeExplosions, grenadeExplosion)
	})
}
