import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core/';

function DeleteDialog({ open, setOpen, removeDemoCallback }) {
  const removeDemo = () => {
    setOpen(false)
    removeDemoCallback()
  }

  return (
    <Dialog open={open}>
      <DialogTitle id="simple-dialog-title">Delete demo confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this demo?
      </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          No
      </Button>
        <Button onClick={removeDemo} color="primary" autoFocus>
          Yes
      </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
