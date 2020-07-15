package common

// FrameState Struct
type FrameState struct {
	Players         []Player
	Grenades        []Grenade
	GrenadeExplodes []int64
	Kill            Kill
	Time            int
}
