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
import { Grid, Box } from '@material-ui/core';
import AppBar from './components/AppBar/AppBar'
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));



function App() {
  const classes = useStyles();
  return (
    <Router>
      <Grid
        container>
        {/* <AppBar /> */}
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
    </Router>
  );
}

export default App;
