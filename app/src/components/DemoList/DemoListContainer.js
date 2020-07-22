import React, { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import DemoList from './DemoList'
import Box from '@material-ui/core/Box';

const fetchDemos = (setDemos) => {
    const url = "http://localhost:8080/demos"
    return fetch(url)
        .then(response => response.json())
        .then(data => setDemos(data))
        .catch(err => console.log(err))
}

function DemoListContainer() {
    const [demos, setDemos] = useState(null);

    useEffect(() => {
        fetchDemos(setDemos)
    }, []);

    return (
        <Box width="1000px">
            {demos ? <DemoList demos={demos} /> : <Loading />}
        </Box>
    )
}

export default DemoListContainer
