import React from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";

const openDemo = (demoPath, history) => {
  history.push("/demo/" + demoPath);
}

const renderTeamInfo = (value_tr, value_ct) => {
  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <Typography>
          {value_tr}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          {value_ct}
        </Typography>
      </Grid>
    </Grid>
  )
}

const renderCardContent = (demo) => {
  return (
    <Grid container direction="column">
      <Grid container direction="column">
        {renderTeamInfo(demo.tr_name, demo.ct_name)}
        {renderTeamInfo(demo.tr_final_score, demo.ct_final_score)}
      </Grid>
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
        <Button color="primary" component="span" onClick={() => openDemo(demo.demo_path, history)}>
          Open Demo
        </Button>
      </CardActions>
    </Card  >
  )
}

export default DemoDetails
