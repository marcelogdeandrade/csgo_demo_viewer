package parsermodels

// Player DataFrame schema
type Player struct {
	ID   uint32
	X    float64
	Y    float64
	Name string
	Team Team
}