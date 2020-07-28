import React, { useEffect } from 'react'
import Login from './Login'
import { loginAction } from '../../actions/user.actions'
import { useDispatch, useSelector } from 'react-redux';

function LoginContainer() {
    const dispath = useDispatch()

    useEffect(() => {
        dispath(loginAction("tokenTeste"))
    }, [])

    return (
        <Login />
    )
}

export default LoginContainer
