import React from 'react';
import DemoContainer from './components/Demo/DemoContainer'
import DemoListContainer from './components/DemoList/DemoListContainer'
import UploadDemoContainer from './components/UploadDemo/UploadDemoContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Menu from './components/Menu/Menu'
import './App.css';
import 'fontsource-roboto';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <Router>
      <Grid
        container
        justify="center"
        direction="row">
        <Grid
          item xs={5}>
          <Menu />
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
