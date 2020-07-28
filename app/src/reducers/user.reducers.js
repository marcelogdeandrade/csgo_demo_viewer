import { loginAction, logoutAction, actionTypes } from '../actions/user.actions'

const initialState = {
  isLoggedIn: false,
  sessionToken: null
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        sessionToken: action.sessionToken
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        sessionToken: null
      }
    default:
      return state
  }
}