import {
  SET_CATEGORIES_DATA_AFTER_FETCHING,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING,
} from '../../../constants/actionTypes'

export const categoriesReducer = (state, action) => {
  switch (action.type) {
    case SET_CATEGORIES_LOADING:
      return { ...state, loading: action.payload }
    //end case SET_CATEGORIES_LOADING

    case SET_CATEGORIES_DATA_AFTER_FETCHING:
      const { categories } = action.payload
      return {
        ...state,
        categories,
        loading: false,
        error: null,
        isError: false,
      }
    //end case SET_CATEGORIES_DATA_AFTER_FETCHING

    case SET_CATEGORIES_ERROR:
      const error = action.payload
      return { ...state, categories, loading: false, error, isError: true }
    //end case SET_CATEGORIES_ERROR
    default:
      throw new Error(
        `the action type ${action.type} doesn't match any action in the categories reducer`,
      )
  }
}
