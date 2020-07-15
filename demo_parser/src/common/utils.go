package common

import (
	"log"
	"math"
	"os"
	"strconv"

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
		RoundStarts: make([]RoundStart, 0),
		States:      make([]FrameState, frames+10),
	}
	for i := range match.States {
		match.States[i].GrenadeExplodes = make([]int64, 0)
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
		currentTime := int(float64(p.CurrentTime()) / math.Pow(10, 9))
		grenades := GetGrenadeProjectile(p.GameState(), *match)

		match.States[idx].Players = players
		match.States[idx].Time = currentTime
		match.States[idx].Grenades = grenades
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

// GetRoundTime function
func GetRoundTime(gameState dem.GameState) int {
	roundtime, _ := strconv.ParseFloat(gameState.ConVars()["mp_roundtime_defuse"], 64)
	freezetime, _ := strconv.Atoi(gameState.ConVars()["mp_freezetime"])
	return int(roundtime*60) + freezetime
}

// GetGrenadeProjectile function
func GetGrenadeProjectile(gameState dem.GameState, match Match) (grenades []Grenade) {
	projectiles := gameState.GrenadeProjectiles()
	grenades = make([]Grenade, 0)
	for _, grenade := range projectiles {
		scaledX, scaledY := metadata.MapNameToMap[match.MapName].TranslateScale(grenade.Position().X, grenade.Position().Y)
		grenades = append(grenades, Grenade{
			X:          scaledX,
			Y:          scaledY,
			Equipament: int(grenade.WeaponInstance.Type),
			ID:         grenade.WeaponInstance.UniqueID(),
		})
	}
	return grenades
}
