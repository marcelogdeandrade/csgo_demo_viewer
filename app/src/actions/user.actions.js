export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
}

export const loginAction = (token) => {
  return {
    type: actionTypes.LOGIN,
    token
  }
}

export const logoutAction = () => {
  return {
    type: actionTypes.LOGOUT
  }
}