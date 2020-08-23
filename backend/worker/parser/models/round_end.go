package parsermodels

// RoundEnd schema
type RoundEnd struct {
	Frame  int
	Winner TeamSide
	Reason RoundEndReason
}
