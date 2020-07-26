import React from 'react'
import Player from './PlayerInfo'


function PlayerInfoContainer({ player }) {
    return (
        <Player
            life={player.Health}
            name={player.Name}
            kills={player.Kills}
            deaths={player.Deaths}
            assists={player.Assists}
        />

    )
}

export default PlayerInfoContainer
