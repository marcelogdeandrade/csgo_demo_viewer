import React from 'react'
import moment from 'moment';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const formatRoundTime = (seconds) => {
    return moment().startOf('day')
        .seconds(seconds)
        .format('mm:ss');
}

function RoundTime(props) {
    return (
        <Box position="absolute">
            <Typography color="primary">{formatRoundTime(props.currentTime)}</Typography>
        </Box>
    )
}

export default RoundTime
