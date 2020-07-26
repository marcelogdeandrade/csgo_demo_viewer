package parsermodels

// TeamSide type
type TeamSide string

// Team constants give information about which team a player is on.
const (
	TeamTerrorists        TeamSide = "Terrorists"
	TeamCounterTerrorists TeamSide = "Counter-Terrorists"
	Unknown               TeamSide = "Unknown"
)
