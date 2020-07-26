import React from 'react'
import Box from '@material-ui/core/Box';
import Image from '../../Image/Image'
import Slider from '../../Slider/Slider'
import constants from '../../../constants'

function DemoPlayer(props) {
  return (
    <Box>
      <Image path={props.mapPath} />
      {props.renderInfernos()}
      {props.renderGrenades()}
      {props.renderPlayers()}
      <Slider
        onChange={(e, value) => props.changeFrame(value)}
        min={constants.ROUND_START_FRAME}
        value={props.currentIdx}
        max={props.maxFrames}
        defaultValue={props.currentIdx}
      />
    </Box>
  )
}

export default DemoPlayer
