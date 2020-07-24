import React from 'react';
import DemoContainer from './components/Demo/DemoContainer'
import DemoListContainer from './components/DemoList/DemoListContainer'
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

function App() {
  return (
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
          <Route path="/demo/:id">
            <Grid item xs={12}>
              <DemoContainer />
            </Grid>
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
