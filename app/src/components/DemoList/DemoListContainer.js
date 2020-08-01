import React, { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import DemoList from './DemoList'
import Box from '@material-ui/core/Box';
import { fetchUrl } from '../../url'
import Cookies from 'js-cookie';

const fetchDemos = (setDemos) => {
  const url = fetchUrl() + "/auth/demos"
  return fetch(url, {
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => setDemos(data))
    .catch(err => console.log(err))
}

function DemoListContainer() {
  const [demos, setDemos] = useState(null);
  const token = Cookies.get("jwt")

  useEffect(() => {
    if (token) {
      fetchDemos(setDemos, token)
    }
  }, [token]);

  return (
    <Box width="1000px">
      {token ? demos ? <DemoList demos={demos} /> : <Loading /> : <Error />}
    </Box>
  )
}

export default DemoListContainer
