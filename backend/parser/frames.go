package parser

import (
	"math"
	"time"

	"github.com/golang/geo/r2"
	models "github.com/marcelogdeandrade/csgo_demo_viewer/parser/models"
	"github.com/markus-wa/demoinfocs-golang/metadata"
	dem "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs"
	common "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs/common"
)

// IterateFrames function
func IterateFrames(p dem.Parser, match *models.Match) {
	count := 0
	for ok, err := p.ParseNextFrame(); ok; ok, err = p.ParseNextFrame() {
		CheckError(err)

		// Skip frames
		count++
		if count%match.FrameFactor != 0 {
			continue
		}

		gameState := p.GameState()
		idx := AdjustFrameIndex(p.CurrentFrame(), match.FrameFactor)

		// Add Players
		players := getPlayers(gameState, match.MapName)
		match.Frames[idx].Players = players

		// Add Time
		time := getCurrentTime(p.CurrentTime())
		match.Frames[idx].TimeElapsed = time

		// Add Grenades
		grenades := getGrenadeProjectile(gameState, match.MapName)
		match.Frames[idx].Grenades = grenades

		// Add Infernos
		infernos := getInfernos(gameState, match.MapName)
		match.Frames[idx].Infernos = infernos

		// Add CT
		ct := getTeam(*gameState.TeamCounterTerrorists())
		match.Frames[idx].CounterTerrorists = ct

		// Add TR
		tr := getTeam(*gameState.TeamTerrorists())
		match.Frames[idx].Terrorists = tr
	}
}

func getTeam(team common.TeamState) models.Team {
	name := team.ClanName()
	id := team.ID()
	return models.Team{
		Name:  name,
		ID:    id,
		Score: 0,
	}
}

func getCurrentTime(currentTime time.Duration) int {
	return int(float64(currentTime) / math.Pow(10, 9))
}

func getPlayers(gameState dem.GameState, mapName string) []models.Player {
	var players []models.Player
	cts := iterateTeam(*gameState.TeamCounterTerrorists(), models.TeamCounterTerrorists, mapName)
	ts := iterateTeam(*gameState.TeamTerrorists(), models.TeamTerrorists, mapName)
	players = append(cts, ts...)
	return players
}

func iterateTeam(teamState common.TeamState, team models.TeamSide, mapName string) (players []models.Player) {
	for _, member := range teamState.Members() {

		position := member.Position()
		scaledX, scaledY := metadata.MapNameToMap[mapName].TranslateScale(position.X, position.Y)
		player := models.Player{
			ID:            member.SteamID32(),
			X:             scaledX,
			Y:             scaledY,
			Name:          member.Name,
			ViewDirection: member.ViewDirectionX(),
			Team:          team,
			IsAlive:       member.IsAlive(),
			Health:        member.Health(),
			Kills:         member.Kills(),
			Deaths:        member.Deaths(),
			Assists:       member.Assists(),
		}
		players = append(players, player)
	}
	return
}

func getGrenadeProjectile(gameState dem.GameState, mapName string) (grenades []models.Grenade) {
	projectiles := gameState.GrenadeProjectiles()
	grenades = make([]models.Grenade, 0)
	for _, grenade := range projectiles {
		scaledX, scaledY := metadata.MapNameToMap[mapName].TranslateScale(grenade.Position().X, grenade.Position().Y)
		grenades = append(grenades, models.Grenade{
			X:          scaledX,
			Y:          scaledY,
			Equipament: grenade.WeaponInstance.Type.String(),
			ID:         grenade.WeaponInstance.UniqueID(),
			Exploded:   false,
		})
	}
	return
}

func getInfernos(gameState dem.GameState, mapName string) (infernos []models.Inferno) {
	stateInfernos := gameState.Infernos()
	infernos = make([]models.Inferno, 0)
	for _, inferno := range stateInfernos {
		hull := inferno.Fires().ConvexHull2D()
		positions := make([]r2.Point, 0)
		for _, v := range hull {
			scaledX, scaledY := metadata.MapNameToMap[mapName].TranslateScale(v.X, v.Y)
			positions = append(positions, r2.Point{
				X: scaledX,
				Y: scaledY,
			})
		}
		infernos = append(infernos, models.Inferno{
			Positions: positions,
		})
	}
	return
}
