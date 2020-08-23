import React, { useState } from 'react'
import { Button, Typography, Grid, Paper, IconButton } from '@material-ui/core/';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from './DeleteDialog'

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 10
  }
}));

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
      <Grid item>
        <Typography>
          {demo.date}
        </Typography>
      </Grid>
    </Grid>

  )
}

function DemoDetails(props) {
  const history = useHistory()
  const classes = useStyles()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const demo = props.demo

  const renderConfirmDeleteDialog = () => {
    return (
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        removeDemoCallback={() => props.removeDemoCallback(demo.demo_path)}
      />
    )
  }

  return (
    <div>
      <Paper className={classes.card}>
        {renderCardContent(demo)}
        <Grid
          container
          justify="space-between"
          direction="row">
          <Button variant="outlined" color="primary" onClick={() => openDemo(demo.demo_path, history)}>
            Open Demo
        </Button>
          <IconButton variant="outlined" color="primary" onClick={() => setDeleteDialogOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Paper  >
      {renderConfirmDeleteDialog()}
    </div>

  )
}

export default DemoDetails
