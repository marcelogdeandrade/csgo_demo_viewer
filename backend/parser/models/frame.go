package parsermodels

// Frame Struct
type Frame struct {
	Players           []Player
	Kills             []Kill
	Grenades          []Grenade
	Infernos          []Inferno
	Round             int
	Time              int
	Terrorists        Team
	CounterTerrorists Team
}
