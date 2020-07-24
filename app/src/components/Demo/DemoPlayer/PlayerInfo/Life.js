import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Life({ value }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="primary">{value}</Typography>
      </Box>
    </Box>
  )
}

export default Life
