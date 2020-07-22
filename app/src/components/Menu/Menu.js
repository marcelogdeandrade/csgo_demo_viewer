import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublishIcon from '@material-ui/icons/Publish';
import ListIcon from '@material-ui/icons/List';
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

function Menu() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left">
      <List>
        <ListItem
          onClick={() => history.push("/upload/")}
          button
          key={"upload"}>
          <ListItemIcon>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText primary={"Upload Demo"} />
        </ListItem>
        <ListItem
          onClick={() => history.push("/demos/")}
          button
          key={"demos"}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={"View demos"} />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Menu
