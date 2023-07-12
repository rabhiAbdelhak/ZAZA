import {
  CLOSE_STATUS_DRAWER,
  INITIALIZE_ALERT_DIALOG_STATUS,
  OPEN_STATUS_DRAWER,
  SET_ALERT_DIALOG_STATUS,
} from '../../../constants/actionTypes'

export const setAlertDialogStatus = (status) => (dispatch) => {
  dispatch({ type: SET_ALERT_DIALOG_STATUS, payload: status })
}

export const initializeAlertDialogStatus = (status) => (dispatch) => {
  dispatch({ type: INITIALIZE_ALERT_DIALOG_STATUS })
}

export const openStatusDrawer = (status) => (dispatch) => {
  dispatch({ type: OPEN_STATUS_DRAWER, payload: status })
}

export const closeStatusDrawer = () => (dispatch) => {
  dispatch({ type: CLOSE_STATUS_DRAWER })
}
