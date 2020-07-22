import React from 'react'
import { AppBar as AppBarMaterial } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

function AppBar() {
  const classes = useStyles();

  return (
    <AppBarMaterial>
      <Toolbar>
        <Typography variant="h6">
          CSGO Demo Viewer
            </Typography>
      </Toolbar>
    </AppBarMaterial>
  )
}

export default AppBar
