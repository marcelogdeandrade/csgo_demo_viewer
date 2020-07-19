import React from 'react'
import Box from '@material-ui/core/Box';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  image: {
    maxWidth: "100%",
  }
})

function Image(props) {
  const classes = useStyles()
  return (
    <Box>
      <img
        className={classes.image}
        src={props.path}
        alt={props.path} />
    </Box>
  )
}

export default Image
