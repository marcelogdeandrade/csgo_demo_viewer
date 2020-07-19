package parsermodels

// Match Struct
type Match struct {
	FrameFactor       int
	MapName           string
	Frames            []Frame
	Rounds            []Round
	GrenadeExplosions []GrenadeExplosion
}
