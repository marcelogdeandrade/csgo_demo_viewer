import React from 'react'
import Slider from '@material-ui/core/Slider';
import { Grid, IconButton } from '@material-ui/core/';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import constants from '../../constants'

function FrameSelect(props) {
  const toggleIsPlaying = () => {
    props.isPlayingCallback(!props.isPlaying)
  }

  const renderPlayButton = () => {
    const icon = props.isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />
    return (
      <IconButton color="primary" onClick={toggleIsPlaying}>
        {icon}
      </IconButton>
    )
  }

  return (
    <Grid item>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={1}>
          {renderPlayButton()}
        </Grid>
        <Grid item xs={11}>
          <Slider
            onChange={(e, value) => props.changeFrameCallback(value)}
            min={constants.ROUND_START_FRAME}
            value={props.currentFrame}
            max={props.maxFrames}
            defaultValue={props.currentFrame}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FrameSelect
