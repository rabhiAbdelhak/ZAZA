import {
  SET_PACKAGE_COMMENTS_LOADING,
  SET_PACKAGE_DATA_AFTER_FETCHING,
  SET_PACKAGE_ERROR,
  SET_PACKAGE_LOADING,
  SET_PACKAGE_STATUS,
  SET_PACKAGE_STATUS_LOADING,
  SET_PACKAGE_COMMENTS,
} from '../../../constants/actionTypes'

export const packageReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PACKAGE':
      return { ...state, package: action.payload }
    case SET_PACKAGE_LOADING:
      return { ...state, loading: true }
    //end case SET_PACKAGE_LOADING

    case SET_PACKAGE_DATA_AFTER_FETCHING:
      //here we use packag to avoid using the reserved word package
      const { package: pack } = action.payload
      return {
        ...state,
        package: pack,
        loading: false,
        isError: false,
        error: null,
      }
    //end case SET_PACKAGE_DATA_AFTER_FETCHING

    case SET_PACKAGE_ERROR:
      const error = action.payload
      return { ...state, error, isError: true, loading: false }
    //end SET_PACKAGE_ERROR

    case SET_PACKAGE_STATUS_LOADING:
      return { ...state, statusLoading: true }

    case SET_PACKAGE_STATUS:
      return {
        ...state,
        package: { ...state.package, status: action.payload },
        statusLoading: false,
      }
    // end case  SET_PACKAGE_STATUS

    default:
      throw new Error(
        `the action ${action.type} doesn't match any action in the package reducer`,
      )
  }
}
