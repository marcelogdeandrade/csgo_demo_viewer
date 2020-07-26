package parsermodels

// Round schema
type Round struct {
	StartTime       int
	Frame           int
	FreezetimeFrame int
	Winner          TeamSide
	RoundEndReason  RoundEndReason
}
