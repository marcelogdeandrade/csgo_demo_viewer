export const actionTypes = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
}

export const loginAction = (sessionToken) => {
    return {
        type: actionTypes.LOGIN,
        sessionToken
    }
}

export const logoutAction = () => {
    return {
        type: actionTypes.LOGOUT
    }
}