import React from 'react'
import SnackbarMaterial from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { closeAction } from '../../actions/alert.actions'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Snackbar() {
  const open = useSelector(state => state.alert.alertOpen)
  const message = useSelector(state => state.alert.message)
  const alertType = useSelector(state => state.alert.type)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeAction());
  };

  return (
    <SnackbarMaterial
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertType}>
        {message}
      </Alert>
    </SnackbarMaterial>
  )
}

export default Snackbar
