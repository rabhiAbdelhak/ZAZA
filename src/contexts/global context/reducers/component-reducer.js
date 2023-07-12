import {
  CLOSE_STATUS_DRAWER,
  INITIALIZE_ALERT_DIALOG_STATUS,
  OPEN_STATUS_DRAWER,
  SET_ALERT_DIALOG_STATUS,
} from '../../../constants/actionTypes'

export const componentReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT_DIALOG_STATUS:
      return { ...state, alertDialogStatus: action.payload }
    case INITIALIZE_ALERT_DIALOG_STATUS:
      return {
        ...state,
        alertDialogStatus: {
          open: false,
          message: '',
          title: '',
          buttonText: '',
        },
      }
    case OPEN_STATUS_DRAWER:
      return { ...state, statusDrawerState: action.payload }
    case CLOSE_STATUS_DRAWER:
      return { ...state, statusDrawerState: { open: false } }
    default:
      throw new Error(
        `Action ${action.type} does not exist in the component reducer !`,
      )
  }
}
