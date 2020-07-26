import React from 'react'
import PlayerInfoContainer from './PlayerInfoContainer'
import { Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 20,
    marginLeft: 20
  }
}));

function TeamPlayerInfo({ players, team, side }) {
  const classes = useStyles()

  const renderPlayers = () => {
    return players.map(player => {
      return <PlayerInfoContainer player={player} />
    })
  }

  return (
    <div className={classes.root}>
      <Typography
        align="center"
        variant="overline">{side}</Typography>
      {renderPlayers()}
    </div>
  )
}

export default TeamPlayerInfo
