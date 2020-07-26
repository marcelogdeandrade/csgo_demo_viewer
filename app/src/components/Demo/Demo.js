import React from 'react'
import MapContainer from '../Map/MapContainer'
import PlayerHeader from '../DemoHeader/DemoHeader'
import RoundSelect from '../RoundSelect/RoundSelect'
import TeamPlayerInfo from '../PlayerInfo/TeamPlayerInfo'
import { Grid } from '@material-ui/core/';
import FrameSelect from '../FrameSelect/FrameSelect'
import constants from '../../constants'

function Demo(props) {
  return (
    <Grid
      container
      justify="center"
      direction="column">
      <Grid item>
        <Grid
          direction="row"
          container
          justify="center">
          <Grid item xs={2}>
            <TeamPlayerInfo
              players={props.terroristPlayers}
              side={"Terrorists"}
            />
          </Grid>
          <Grid>
            <Grid
              container
              direction="column">
              <Grid item>
                <PlayerHeader
                  trScore={props.terroristTeam.Score}
                  ctScore={props.counterTerroristTeam.Score}
                  timeLeft={props.currentTime}
                />
              </Grid>
              <Grid item>
                <MapContainer
                  mapName={props.mapName}
                  roundFrames={props.roundFrames}
                  currentFrame={props.currentFrame}
                />
              </Grid>
              <Grid item>
                <FrameSelect
                  isPlayingCallback={props.isPlayingCallback}
                  isPlaying={props.isPlaying}
                  currentFrame={props.currentFrame}
                  changeFrameCallback={props.changeFrameCallback}
                  min={constants.ROUND_START_FRAME}
                  value={props.currentFrame}
                  maxFrames={props.maxFrames}
                  defaultValue={props.currentFrame}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <TeamPlayerInfo
              players={props.counterTerroristPlayers}
              side={"Counter-Terrorists"}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <RoundSelect
          rounds={props.rounds}
          currentRound={props.currentRound}
          changeRoundCallback={props.changeRoundCallback}
        />
      </Grid>
    </Grid>
  )
}

export default Demo
