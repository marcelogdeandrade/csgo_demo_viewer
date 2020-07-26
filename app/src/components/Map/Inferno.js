import React from 'react'
import Box from '@material-ui/core/Box';
import { fade } from '@material-ui/core/styles/colorManipulator';

function Inferno(props) {
  const { inferno, positionMultipler } = props

  const avgX = inferno.Positions.reduce((a, b) => a + b.X, 0) / inferno.Positions.length
  const avgY = inferno.Positions.reduce((a, b) => a + b.Y, 0) / inferno.Positions.length

  const baseSize = 45
  const x = (avgX - baseSize / 2 - 5) * positionMultipler
  const y = (avgY - baseSize / 2 + 5) * positionMultipler

  const infernoSize = baseSize * positionMultipler

  return (
    <Box
      left={x}
      top={y}
      position="absolute"
      bgcolor={fade("#E74C3C", 0.7)}
      borderRadius="50%"
      margin="auto"
      textAlign="center"
      width={infernoSize}
      height={infernoSize}
    />
  )
}

export default Inferno
