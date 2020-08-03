import React, { useState } from 'react'
import Login from './Login'
import { loginAction } from '../../actions/user.actions'
import { alertAction } from '../../actions/alert.actions'
import { useDispatch } from 'react-redux';
import { fetchUrl } from '../../url'
import { useHistory } from "react-router-dom";

function LoginContainer() {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const dispath = useDispatch()
  const history = useHistory()

  const fetchLogin = () => {
    const body = JSON.stringify({ username: username, password: password })
    const url = fetchUrl() + "/login"
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: body
    })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        return response.json()
      })
      .then(data => dispath(loginAction(data.token)))
      .then(() => history.push("/demos/"))
      .catch(err => dispath(alertAction("Error with login", "error")))
  }


  return (
    <Login
      setUsername={setUsername}
      setPassword={setPassword}
      fetchLogin={fetchLogin}
    />
  )
}

export default LoginContainer
