package parsermodels

// Frame Struct
type Frame struct {
	Players  []Player
	Kills    []Kill
	Grenades []Grenade
	Round    int
	Time     int
}
