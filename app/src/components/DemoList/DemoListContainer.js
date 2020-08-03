import React, { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import DemoList from './DemoList'
import Box from '@material-ui/core/Box';
import { fetchUrl } from '../../url'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { alertAction } from '../../actions/alert.actions'


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
  const dispath = useDispatch()

  const removeDemo = (demoID) => {
    const url = fetchUrl() + "/auth/remove_demo/" + demoID
    return fetch(url, {
      method: "DELETE",
      credentials: 'include'
    })
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        return response.json()
      })
      .then(data => {
        dispath(alertAction("Demo removed successfully", "success"))
        fetchDemos(setDemos, token)
      })
      .catch(err => dispath(alertAction("Error when removing demo", "error")))
  }

  useEffect(() => {
    if (token) {
      fetchDemos(setDemos, token)
    }
  }, [token]);

  return (
    <Box width="1000px">
      {token ? demos ? <DemoList demos={demos} removeDemoCallback={removeDemo} /> : <Loading /> : <Error />}
    </Box>
  )
}

export default DemoListContainer
