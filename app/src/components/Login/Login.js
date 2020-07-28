import React from 'react'
import { Button, Paper, Typography, Grid, TextField } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 30,
    marginTop: 50,
  },
  item: {
    marginTop: 30,
  },
}));


function Login() {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column">
        <Grid item >
          <Typography variant="overline">Login</Typography>
        </Grid>
        <Grid item className={classes.item}>
          <TextField size="small" id="outlined-basic" label="Username" variant="outlined" />
        </Grid>
        <Grid item className={classes.item}>
          <TextField type="password" size="small" id="outlined-basic" label="Password" variant="outlined" />
        </Grid>
        <Grid item className={classes.item}>
          <Grid container direction="row" justify="space-around">
            <Grid item>
              <Button
                variant="contained"
                color="primary">Login</Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => history.push("/signup/")}
                color="primary">Sign Up</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Login
