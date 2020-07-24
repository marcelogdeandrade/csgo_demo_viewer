import React from 'react'
import PlayerInfoContainer from './PlayerInfoContainer'
import { Typography } from '@material-ui/core/';

function TeamPlayerInfo({ players, team }) {
    const renderPlayers = () => {
        return players.map(player => {
            return <PlayerInfoContainer player={player} />
        })
    }

    return (
        <div>
            <Typography
                color="secondary"
                align="center"
                variant="h5">{team}</Typography>
            {renderPlayers()}
        </div>
    )
}

export default TeamPlayerInfo
