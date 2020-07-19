import React from 'react'
import Button from '@material-ui/core/Button';

function UploadDemo(props) {
  return (
    <div>
      <form onSubmit={props.onFormSubmit}>
        <input
          accept=".dem"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(e) => props.onFormSubmit(e)}
        />
        <label htmlFor="raised-button-file">
          <Button color="primary" component="span" >
            Upload Demo
          </Button>
        </label>
      </form>
    </div>
  )
}

export default UploadDemo
