import React from 'react'
import Box from '@material-ui/core/Box';
import constants from '../../../constants'

function Player(props) {
    const { player, positionMultipler } = props
    const playerSize = constants.PLAYER_SIZE * positionMultipler
    const x = (player.X - 5 - playerSize / 2) * positionMultipler
    const y = (player.Y + 5 - playerSize / 2) * positionMultipler
    return (
        <Box
            left={x}
            top={y}
            position="absolute"
            bgcolor={player.Team === "Terrorists" ? "green" : "red"}
            borderRadius="50%"
            margin="auto"
            textAlign="center"
            width={playerSize}
            height={playerSize}
        />
    )
}

export default Player
