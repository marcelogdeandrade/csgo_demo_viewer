package parsermodels

// RoundEndReason type
type RoundEndReason string

// Team constants give information about which team a player is on.
const (
	RoundEndReasonTargetBombed  RoundEndReason = "BombExploded"
	RoundEndReasonBombDefused   RoundEndReason = "BombDefused"
	RoundEndReasonCTWin         RoundEndReason = "CTWin"
	RoundEndReasonTerroristsWin RoundEndReason = "TRWin"
	RoundEndReasonTargetSaved   RoundEndReason = "TargetSaved"
	Other                       RoundEndReason = "Other"
)
