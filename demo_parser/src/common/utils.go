package common

import (
	"log"
	"os"

	"github.com/markus-wa/demoinfocs-golang/metadata"
	dem "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs"
	common_dem "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs/common"
)

// OpenDemo function
func OpenDemo(path string) (p dem.Parser, f *os.File) {
	f, err := os.Open(path)
	CheckError(err)
	p = dem.NewParser(f)
	return
}

// CreateMatchStruct function
func CreateMatchStruct(p dem.Parser, frameFactor int) (header common_dem.DemoHeader, match *Match) {
	header, err := p.ParseHeader()
	CheckError(err)
	frames := header.PlaybackFrames / frameFactor
	match = &Match{
		MapName:     header.MapName,
		FrameFactor: frameFactor,
		RoundStarts: make([]int, 0),
		States:      make([]FrameState, frames+1),
	}
	return
}

// AddStates function
func AddStates(p dem.Parser, header common_dem.DemoHeader, match *Match) {
	count := 1

	for ok, err := p.ParseNextFrame(); ok; ok, err = p.ParseNextFrame() {
		if err != nil {
			log.Println(err)
			// return here or not?
			continue
		}
		count++

		if count%match.FrameFactor != 0 {
			continue
		}

		var players []Player

		gameState := p.GameState()

		cts := IterateTeam(*gameState.TeamCounterTerrorists(), TeamCounterTerrorists, header.MapName)
		ts := IterateTeam(*gameState.TeamTerrorists(), TeamTerrorists, header.MapName)

		players = append(cts, ts...)

		idx := AdjustFrameIndex(p.CurrentFrame(), match.FrameFactor)
		match.States[idx].Players = players
	}
}

// IterateTeam function
func IterateTeam(teamState common_dem.TeamState, team Team, mapName string) (players []Player) {
	for _, member := range teamState.Members() {

		position := member.Position()
		scaledX, scaledY := metadata.MapNameToMap[mapName].TranslateScale(position.X, position.Y)
		name := member.Name
		id := member.SteamID32()
		player := Player{
			ID:   id,
			X:    scaledX,
			Y:    scaledY,
			Name: name,
			Team: team,
		}
		players = append(players, player)
	}
	return
}

// CheckError function
func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}

// AdjustFrameIndex function
func AdjustFrameIndex(frame int, factor int) int {
	return (frame / factor)
}
