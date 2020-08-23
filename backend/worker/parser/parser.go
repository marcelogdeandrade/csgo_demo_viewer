package parser

import (
	"io"

	models "github.com/marcelogdeandrade/csgo-demo-parser/parser/models"
	"github.com/marcelogdeandrade/csgo-demo-parser/utils"
	dem "github.com/markus-wa/demoinfocs-golang/v2/pkg/demoinfocs"
)

// Parse function
func Parse(f io.Reader) models.Match {
	p := OpenDemo(f)
	match := CreateMatch(p, 1)
	RegisterEventHandlers(p, match)
	IterateFrames(p, match)
	PostParsingAdjustments(match)
	return *match
}

// CreateMatch function
func CreateMatch(p dem.Parser, frameFactor int) *models.Match {
	header, err := p.ParseHeader()
	utils.CheckError(err)
	frames := header.PlaybackFrames / frameFactor

	match := &models.Match{
		FrameFactor: frameFactor,
		FrameRate:   header.FrameRate(),
		MapName:     header.MapName,
		Frames:      make([]models.Frame, frames+10),
	}
	for i := range match.Frames {
		match.Frames[i] = models.Frame{
			Players:  make([]models.Player, 0),
			Kills:    make([]models.Kill, 0),
			Grenades: make([]models.Grenade, 0),
			Infernos: make([]models.Inferno, 0),
		}
	}
	return match
}
