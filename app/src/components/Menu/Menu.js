import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: 10,
  }
}));


function Menu() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          CSGO Demos
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => history.push("/upload/")}>
          Upload
            </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/demos/")}>
          Demos
          </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
