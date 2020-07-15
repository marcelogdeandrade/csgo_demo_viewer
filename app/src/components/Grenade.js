import React from 'react'
import Box from '@material-ui/core/Box';
import { fade } from '@material-ui/core/styles/colorManipulator';


function Grenade(props) {
    const { grenade, positionMultipler } = props
    const isExploded = grenade.isExploded
    const baseSize = isExploded ? 45 : 10
    const x = (grenade.x - baseSize / 2 - 5) * positionMultipler
    const y = (grenade.y - baseSize / 2 + 15) * positionMultipler
    const grenadeSize = baseSize * positionMultipler
    const fadeValue = isExploded ? 0.7 : 1

    return (
        <Box
            zIndex={1000}
            left={x}
            top={y}
            position="absolute"
            bgcolor={fade("#FFFFFF", fadeValue)}
            borderRadius="50%"
            margin="auto"
            textAlign="center"
            width={grenadeSize}
            height={grenadeSize}
        />
    )
}

export default Grenade
