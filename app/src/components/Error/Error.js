import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "50%",
    left: "50%",
    padding: 50,
    transform: "translate(-50%, -50%)"
  },
}));


function Error() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">You don't have access to this page, please login</Typography>
    </Paper>
  )
}

export default Error
