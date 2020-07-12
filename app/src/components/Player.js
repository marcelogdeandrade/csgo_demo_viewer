import React from 'react'
import Box from '@material-ui/core/Box';


function Player(props) {
  const { player, positionMultipler } = props
  const x = (player.x - 5) * positionMultipler
  const y = (player.y - 5) * positionMultipler
  const playerSize = 20 * positionMultipler
  return (
    <Box
      zIndex={1000}
      left={x}
      top={y}
      position="absolute"
      bgcolor={player.team ? "green" : "red"}
      borderRadius="50%"
      margin="auto"
      textAlign="center"
      width={playerSize}
      height={playerSize}
    />
  )
}

export default Player
