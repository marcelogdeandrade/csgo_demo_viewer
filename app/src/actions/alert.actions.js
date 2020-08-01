export const actionTypes = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
}

export const alertAction = (message, alertType) => {
  return {
    type: actionTypes.OPEN,
    alertType,
    message
  }
}

export const closeAction = () => {
  return {
    type: actionTypes.CLOSE,
  }
}