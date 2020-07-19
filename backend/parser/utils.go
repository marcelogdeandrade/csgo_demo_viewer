package parser

import (
	"io"
	"strconv"

	dem "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs"
)

// CheckError function
func CheckError(err error) {
	if err != nil {
		panic(err)
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
	freezetime, _ := strconv.Atoi(gameState.ConVars()["mp_freezetime"])
	return int(roundtime*60) + freezetime
}
