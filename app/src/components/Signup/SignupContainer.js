import React, { useState } from 'react'
import Signup from './Signup'
import { fetchUrl } from '../../url'
import { useDispatch } from 'react-redux';
import { alertAction } from '../../actions/alert.actions'
import { useHistory } from "react-router-dom";


function SignupContainer() {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const fetchSignup = () => {
    const body = JSON.stringify({ username: username, password: password })
    const url = fetchUrl() + "/signup"
    if (checkPassword()) {
      return fetch(url, {
        method: 'POST',
        body: body
      })
        .then(response => {
          if (response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server");
          }
          return response.json()
        })
        .then(data => {
          dispatch(alertAction("Signup Successful", "success"))
          history.push("/login/")
        })
    }
  }

  const checkPassword = () => {
    if (password !== confirmPassword) {
      dispatch(alertAction("Different passwords", "error"))
      return false
    } else {
      return true
    }
  }

  return (
    <Signup
      fetchSignup={fetchSignup}
      setUsername={setUsername}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
    />
  )
}

export default SignupContainer
