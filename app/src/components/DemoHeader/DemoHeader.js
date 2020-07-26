import React from 'react'
import { Typography, Paper, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    marginBottom: 10
  }
}));


const formatRoundTime = (seconds) => {
  return moment().startOf('day')
    .seconds(seconds)
    .format('mm:ss');
}

function DemoHeader({ trScore, ctScore, timeLeft }) {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-around">
        <Grid item>
          <Typography align="center" variant="h4">
            {trScore}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant="caption">
            Time left
          </Typography>
          <Typography align="center" variant="h5">
            {formatRoundTime(timeLeft)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant="h4">
            {ctScore}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default DemoHeader
