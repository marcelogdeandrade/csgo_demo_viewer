import React from 'react'
import { Paper, Typography, Grid } from '@material-ui/core/';
import Life from './Life'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
    marginTop: 10
  }
}));

function PlayerInfo(props) {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Grid
        container
        alignItems="center"
        direction="row">
        <Grid item xs={6}>
          <Typography>{props.name}</Typography>
          <Life value={props.life} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">KDA</Typography>
          <Typography color="primary">{props.kills} - {props.deaths} - {props.assists}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PlayerInfo
