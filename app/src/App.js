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
} from "react-router-dom";
import './App.css';
import 'fontsource-roboto';
import { Grid } from '@material-ui/core';
import Menu from './components/Menu/Menu'
import { createStore } from 'redux'
import { loginReducer } from './reducers/user.reducers'
import { Provider } from 'react-redux'

function App() {
  const store = createStore(loginReducer)

  return (
    <Provider store={store}>
      <Router>
        <Grid
          container
          justify="center">
          <Menu />
          <Switch>
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
