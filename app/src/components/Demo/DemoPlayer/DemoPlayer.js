import React from 'react'
import Box from '@material-ui/core/Box';
import Image from '../../Image/Image'
import Slider from '../../Slider/Slider'
import RoundTime from './RoundTime'

function DemoPlayer(props) {
  return (
    <Box>
      <RoundTime currentTime={props.currentTime} />
      <Image path={props.mapPath} />
      {props.renderPlayers()}
      {props.renderGrenades()}
      <Slider
        onChange={(e, value) => props.changeFrame(value)}
        min={0}
        value={props.currentIdx}
        max={props.maxFrames}
        defaultValue={props.currentIdx}
      />
    </Box>
  )
}

export default DemoPlayer
