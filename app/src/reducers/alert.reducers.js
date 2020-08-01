import { actionTypes } from '../actions/alert.actions'

const initialState = {
  type: null,
  message: null,
  alertOpen: false
}

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN:
      return {
        ...state,
        type: action.alertType,
        message: action.message,
        alertOpen: true
      }
    case actionTypes.CLOSE:
      return {
        ...state,
        type: "",
        message: "",
        alertOpen: false
      }
    default:
      return state
  }
}