import { categoryApi } from '../../../api/category'
import {
  SET_CATEGORIES_DATA_AFTER_FETCHING,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING,
} from '../../../constants/actionTypes'

export const getCategories = () => async (dispatch) => {
  //mak categories in a loading state
  dispatch({ type: SET_CATEGORIES_LOADING, payload: true })

  //run the fetch method in the category api and receive an error and data, one of them is null
  const { error, data } = await categoryApi.getCategories({})

  //change the data or the error state
  if (data) {
    dispatch({
      type: SET_CATEGORIES_DATA_AFTER_FETCHING,
      payload: { categories: data.data },
    })
  } else if (error) {
    dispatch({ type: SET_CATEGORIES_ERROR, payload: error })
  }
}
