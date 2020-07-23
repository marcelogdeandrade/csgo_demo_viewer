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
        <Grid item>
          <Switch>
            <Route path="/upload">
              <UploadDemoContainer />
            </Route>
            <Route path="/demos">
              <DemoListContainer />
            </Route>
            <Route path="/demo/:id">
              <DemoContainer />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
