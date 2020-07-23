import React from 'react'
import { Button, Paper } from '@material-ui/core/';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import brLocale from "date-fns/locale/pt-BR";

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
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
        <KeyboardDatePicker
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Data da demo"
          value={props.selectedDate}
          onChange={props.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }} />
      </MuiPickersUtilsProvider>
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


  return (
    <Paper className={classes.paper}>
      {renderDatePicker(props.selectedDate, props.handleDateChange)}
      {renderUploadButton(props.onFormSubmit)}
    </Paper>
  )
}

export default UploadDemo
