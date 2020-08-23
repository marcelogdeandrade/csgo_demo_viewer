import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Loading from '../Loading/Loading';
import DemoContainer from './DemoContainer'
import Box from '@material-ui/core/Box';
import { fetchUrl } from '../../url'

function DemoFetch() {
  const { id } = useParams();
  const [demo, setDemo] = useState(null);

  const fetchDemoFile = (url) => {
    console.log(url)
    return fetch(url)
      .then(response => response.json())
      .then(data => setDemo(data))
      .catch(err => console.log(err))
  }

  const fetchDemo = (demoName) => {
    if (!demoName) { return null }
    const url = fetchUrl() + "/auth/get_demo/" + demoName
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => fetchDemoFile(data.demo_url))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchDemo(id)
  }, [id]);

  console.log(demo)

  return (
    <Box>
      {demo ?
        <DemoContainer
          demo={demo}
        /> : <Loading />}
    </Box>
  )
}

export default DemoFetch
