package common

import (
	dem "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs"
	events "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs/events"
)

// RegisterEventHandlers function
func RegisterEventHandlers(p dem.Parser, match *Match) {
	p.RegisterEventHandler(func(e events.RoundStart) {
		idx := AdjustFrameIndex(p.CurrentFrame(), match.FrameFactor)
		roundTime := GetRoundTime(p.GameState())
		if p.GameState().IsMatchStarted() {
			roundStart := RoundStart{
				Frame:     idx,
				RoundTime: roundTime,
			}
			match.RoundStarts = append(match.RoundStarts, roundStart)
		}
	})
	p.RegisterEventHandler(func(e events.Kill) {
		idx := AdjustFrameIndex(p.CurrentFrame(), match.FrameFactor)
		match.States[idx].Kill = Kill{
			Victim: e.Victim.Name,
			Killer: e.Killer.Name,
		}
	})
}
