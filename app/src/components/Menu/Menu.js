import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../actions/user.actions'

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
  const isLoggedIn = useSelector(state => state.login.isLoggedIn)
  const dispatch = useDispatch()

  const logout = () => {
    Cookies.remove("jwt", { path: "/", domain: ".marcelao.com.br" })
    history.push("/login/")
    dispatch(logoutAction())
  }

  const renderLoggedInMenu = () => {
    return (
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
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => history.push("/demos/")}>
          Demos
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    )
  }

  const renderLoggedOut = () => {
    return (
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          CSGO Demos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/login/")}>
          Login
          </Button>
      </Toolbar>
    )
  }


  return (
    <AppBar position="static">
      {isLoggedIn ? renderLoggedInMenu() : renderLoggedOut()}
    </AppBar>
  )
}

export default Menu
