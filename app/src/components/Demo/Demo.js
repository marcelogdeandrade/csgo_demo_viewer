import React from 'react'
import DemoPlayerContainer from './DemoPlayer/DemoPlayerContainer'
import RoundSelect from './RoundSelect'
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
        xs={12}>
        <DemoPlayerContainer
          mapName={props.mapName}
          roundFrames={props.roundFrames}
        />
        <RoundSelect
          rounds={props.rounds}
          maxRounds={props.maxRounds}
          currentRound={props.currentRound}
          changeRoundCallback={props.changeRoundCallback}
        />
      </Grid>
    </Grid>
  )
}

export default Demo
