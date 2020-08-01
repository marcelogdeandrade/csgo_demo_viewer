import { actionTypes } from '../actions/user.actions'

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
        token: action.token
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null
      }
    default:
      return state
  }
}