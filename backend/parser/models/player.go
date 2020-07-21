package parsermodels

// Player DataFrame schema
type Player struct {
	ID            uint32
	X             float64
	Y             float64
	ViewDirection float32
	Name          string
	Team          TeamSide
	IsAlive       bool
}
