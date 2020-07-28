import React from 'react'
import { Button, Paper, Typography, Grid, TextField } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 30,
    marginTop: 50,
  },
  item: {
    marginTop: 30,
  },
}));


function Signup() {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column">
        <Grid item >
          <Typography variant="overline">Sign-up</Typography>
        </Grid>
        <Grid item className={classes.item}>
          <TextField size="small" id="outlined-basic" label="Username" variant="outlined" />
        </Grid>
        <Grid item className={classes.item}>
          <TextField type="password" size="small" id="outlined-basic" label="Password" variant="outlined" />
        </Grid>
        <Grid item className={classes.item}>
          <TextField type="password" size="small" id="outlined-basic" label="Confirm Password" variant="outlined" />
        </Grid>
        <Grid item className={classes.item}>
          <Grid item>
            <Button
              variant="contained"
              color="primary">Sign Up</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Signup
