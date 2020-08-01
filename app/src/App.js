import React from 'react';
import DemoFetch from './components/Demo/DemoFetch'
import DemoListContainer from './components/DemoList/DemoListContainer'
import LoginContainer from './components/Login/LoginContainer'
import SignupContainer from './components/Signup/SignupContainer'
import UploadDemoContainer from './components/UploadDemo/UploadDemoContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import 'fontsource-roboto';
import { Grid } from '@material-ui/core';
import Menu from './components/Menu/Menu'
import Snackbar from './components/Snackbar/Snackbar'
import { createStore, combineReducers } from 'redux'
import { loginReducer } from './reducers/user.reducers'
import { alertReducer } from './reducers/alert.reducers'

import { Provider } from 'react-redux'
import Cookies from 'js-cookie';

function App() {
  const token = Cookies.get("jwt")
  const isLoggedIn = token != null
  const store = createStore(
    combineReducers({ login: loginReducer, alert: alertReducer }),
    { login: { isLoggedIn: isLoggedIn, token: token } },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return (
    <Provider store={store}>
      <Router>
        <Snackbar />
        <Grid
          container
          justify="center">
          <Menu />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  isLoggedIn ?
                    <Redirect to="/demos" /> :
                    <Redirect to="/login" />
                )
              }}
            />
            <Route path="/upload">
              <Grid item>
                <UploadDemoContainer />
              </Grid>
            </Route>
            <Route path="/demos">
              <Grid item>
                <DemoListContainer />
              </Grid>
            </Route>
            <Route path="/login">
              <Grid item>
                <LoginContainer />
              </Grid>
            </Route>
            <Route path="/signup">
              <Grid item>
                <SignupContainer />
              </Grid>
            </Route>
            <Route path="/demo/:id">
              <Grid item xs={12}>
                <DemoFetch />
              </Grid>
            </Route>
          </Switch>
        </Grid>
      </Router>
    </Provider>
  );
}

export default App;
