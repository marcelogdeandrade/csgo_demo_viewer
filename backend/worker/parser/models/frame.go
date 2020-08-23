package parsermodels

// Frame Struct
type Frame struct {
	Players           []Player
	Kills             []Kill
	Grenades          []Grenade
	Infernos          []Inferno
	Round             int
	IsFreezeTime      bool
	Time              int
	TimeElapsed       int
	Terrorists        Team
	CounterTerrorists Team
}
