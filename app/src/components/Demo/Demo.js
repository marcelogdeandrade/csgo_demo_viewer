import React from 'react'
import DemoPlayerContainer from './DemoPlayer/DemoPlayerContainer'
import RoundSlider from './RoundsSlider'
import { Grid } from '@material-ui/core/';

function Demo(props) {
  return (
    <Grid
      direction="row"
      container
      justify="center"
    >
      <Grid
        item
        xs={10}>
        <DemoPlayerContainer
          mapName={props.mapName}
          roundFrames={props.roundFrames}
        />
        <RoundSlider
          maxRounds={props.maxRounds}
          currentRound={props.currentRound}
          changeRoundCallback={props.changeRoundCallback}
        />
      </Grid>
    </Grid>
  )
}

export default Demo
