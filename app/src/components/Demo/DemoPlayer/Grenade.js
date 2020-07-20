import React from 'react'
import Box from '@material-ui/core/Box';
import { fade } from '@material-ui/core/styles/colorManipulator';
import constants from '../../../constants'

const colors = {
    "Smoke Grenade": "#F7F9F9",
    "Decoy Grenade": "#D5DBDB",
    "Flashbang": "#FCF3CF",
    "Incendiary Grenade": "#E74C3C",
    "Molotov": "#E74C3C",
    "HE Grenade": "#ABB2B9"
}

function Grenade(props) {
    const { grenade, positionMultipler } = props
    const isExploded = grenade.Exploded
    const baseSize = isExploded ? constants.GRENADE_SIZE_EXPLODED : constants.GRENADE_SIZE
    const x = (grenade.X - baseSize / 2 - 5) * positionMultipler
    const y = (grenade.Y - baseSize / 2 + 5) * positionMultipler
    const grenadeSize = baseSize * positionMultipler
    const fadeValue = isExploded ? 0.7 : 1

    return (
        <Box
            left={x}
            top={y}
            position="absolute"
            bgcolor={fade(colors[grenade.Equipament], fadeValue)}
            borderRadius="50%"
            margin="auto"
            textAlign="center"
            width={grenadeSize}
            height={grenadeSize}
        />
    )
}

export default Grenade
