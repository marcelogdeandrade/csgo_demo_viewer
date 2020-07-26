package parsermodels

// Match Struct
type Match struct {
	FrameFactor       int
	FrameRate         float64
	MapName           string
	Scores            []Score
	Frames            []Frame
	Rounds            []Round
	RoundEnds         []RoundEnd
	Freezetimes       []Freezetime
	GrenadeExplosions []GrenadeExplosion
}
