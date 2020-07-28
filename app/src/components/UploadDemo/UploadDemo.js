import React from 'react'
import { Button, Paper, Typography, Grid, Tooltip, IconButton } from '@material-ui/core/';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 30,
    marginTop: 50,
  },
  uploadButton: {
    marginTop: 10,
  }
}));



function UploadDemo(props) {
  const classes = useStyles();

  const renderDatePicker = () => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Demo date"
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }} />
      </MuiPickersUtilsProvider >
    )
  }

  const renderUploadButton = () => {
    return (
      <form onSubmit={props.onFormSubmit}>
        <input
          accept=".dem"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(e) => props.onFormSubmit(e)}
        />
        <label htmlFor="raised-button-file">
          <Button
            className={classes.uploadButton}
            variant="contained"
            component="span"
            color="secondary">
            Upload Demo
          </Button>
        </label>
      </form>
    )
  }

  const helperMessage = `
    Accepts only .dem files
  `

  return (
    <Paper className={classes.paper}>
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography variant="overline">Upload your CSGO Demo</Typography>
            </Grid>
            <Grid item>
              <Tooltip title={helperMessage}>
                <IconButton>
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {renderDatePicker(props.selectedDate, props.handleDateChange)}
        </Grid>
        <Grid item>
          {renderUploadButton(props.onFormSubmit)}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default UploadDemo
