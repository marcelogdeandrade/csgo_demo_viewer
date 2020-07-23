import React from 'react'
import { Button, Card, CardContent, CardActions, Typography, Grid } from '@material-ui/core/';
import { useHistory } from "react-router-dom";

const openDemo = (demoPath, history) => {
  history.push("/demo/" + demoPath);
}

const renderTeamNames = (name_tr, name_ct) => {
  return (
    <Grid item>
      <Typography variant="h5">
        {name_tr} vs {name_ct}
      </Typography>
    </Grid>
  )
}

const renderScore = (score_tr, score_ct) => {
  return (
    <Grid item>
      <Typography variant="button">
        {score_tr} x {score_ct}
      </Typography>
    </Grid>
  )
}

const renderCardContent = (demo) => {
  return (
    <Grid container direction="column" alignItems="center">
      {renderTeamNames(demo.tr_name, demo.ct_name)}
      {renderScore(demo.tr_final_score, demo.ct_final_score)}
      <Grid item>
        <Typography>
          {demo.map}
        </Typography>
      </Grid>
    </Grid>

  )
}

function DemoDetails(props) {
  const history = useHistory();

  const demo = props.demo
  return (
    <Card>
      <CardContent>
        {renderCardContent(demo)}
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="primary" onClick={() => openDemo(demo.demo_path, history)}>
          Open Demo
        </Button>
      </CardActions>
    </Card  >
  )
}

export default DemoDetails
