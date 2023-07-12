import { paymentApi } from '../../../api/payment'
import {
  INITIALIZE_IMPORTATION_ERRORS,
  INITIALIZE_PAYMENTS_fILTERS,
  SET_IMPORTATION_ERRORS,
  SET_PAYMENTS_DATA_AFETER_FETCHING,
  SET_PAYMENTS_ERROR,
  SET_PAYMENTS_FILTERS,
  SET_PAYMENTS_LOADING,
  SET_PAYMENTS_PAGINATION,
  SET_PAYMENTS_QUERY,
} from '../../../constants/actionTypes'

export const getPayments = (options) => async (dispatch) => {
  //method to get all payments
  dispatch({ type: SET_PAYMENTS_LOADING, payload: true })
  const { error, data } = await paymentApi.getPayments(options)
  if (error) {
    dispatch({ type: SET_PAYMENTS_ERROR, payload: error })
  }
  if (data) {
    const { data: payments, meta } = data
    dispatch({
      type: SET_PAYMENTS_DATA_AFETER_FETCHING,
      payload: { payments: payments, meta },
    })
  }
}

export const setPaymentsPagination =
  ({ page, perPage }) =>
  (dispatch) => {
    dispatch({ type: SET_PAYMENTS_PAGINATION, payload: { page, perPage } })
  }

export const setPaymentsFilter = (filters) => (dispatch) => {
  dispatch({ type: SET_PAYMENTS_FILTERS, payload: filters })
}

export const initializePaymentsfilters = () => (dispatch) => {
  dispatch({ type: INITIALIZE_PAYMENTS_fILTERS })
}

export const setPaymentsQuery = (query) => (dispatch) => {
  dispatch({ type: SET_PAYMENTS_QUERY, payload: query })
}
