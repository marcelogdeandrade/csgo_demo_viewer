package parsermodels

// Match Struct
type Match struct {
	FrameFactor       int
	MapName           string
	Scores            []Score
	Frames            []Frame
	Rounds            []Round
	GrenadeExplosions []GrenadeExplosion
}
