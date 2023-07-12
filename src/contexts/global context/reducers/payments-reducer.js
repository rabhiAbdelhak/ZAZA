import {
  SET_PAYMENTS_LOADING,
  SET_PAYMENTS_DATA_AFETER_FETCHING,
  SET_PAYMENTS_ERROR,
  SET_PAYMENTS_FILTERS,
  SET_PAYMENTS_QUERY,
  INITIALIZE_PAYMENTS_STATE,
  INITIALIZE_PAYMENTS_fILTERS,
  SET_PAYMENTS_PAGINATION,
  SET_IMPORTATION_ERRORS,
  INITIALIZE_IMPORTATION_ERRORS,
} from '../../../constants/actionTypes'
import {
  initialFilters,
  paymentsInitialState,
} from '../initial-states/payments-initial-state'

export const paymentsReducer = (state, action) => {
  switch (action.type) {
    case SET_PAYMENTS_LOADING:
      return { ...state, loading: action.payload }
    //end case SET_PAYMENTS_LOADING

    case SET_PAYMENTS_DATA_AFETER_FETCHING:
      const { payments, meta } = action.payload
      const { total, last_page } = meta
      return {
        ...state,
        payments,
        error: null,
        isError: false,
        loading: false,
        totalPackages: total,
        pagination: { ...state.pagination, totalPages: last_page },
        totalProducts: total,
      }
    //end case SET_PAYMENTS_DATA_AFETER_FETCHING

    case SET_PAYMENTS_ERROR:
      const error = action.payload
      return { ...state, isError: true, error, loading: false }
    //end SET_PAYMENTS_ERROR

    case SET_PAYMENTS_FILTERS:
      const filters = action.payload
      return { ...state, filters: filters }
    //end SET_PAYMENTS_FILTERS

    case INITIALIZE_PAYMENTS_STATE:
      return paymentsInitialState
    //end case INITIALIZE_PAYMENTS_STATE

    case INITIALIZE_PAYMENTS_fILTERS:
      return { ...state, filters: initialFilters }

    case SET_PAYMENTS_PAGINATION:
      const { page, perPage } = action.payload
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: page ? page : state.pagination.page,
          perPage: perPage ? perPage : state.pagination.perPage,
        },
      }
    //end case SET_PAYMENTS_PAGINATION

    case SET_PAYMENTS_QUERY:
      return { ...state, query: action.payload }
    //end case SET_PAYMENTS_QUERY

    case SET_IMPORTATION_ERRORS:
      const importError = action.payload
      return { ...state, importError, loading: false }
    //end case SET_IMPORTATION_ERRORS;

    case INITIALIZE_IMPORTATION_ERRORS:
      return { ...state, importError: null, loading: false }
    //end case SET_IMPORTATION_ERRORS;

    default:
      throw new Error(
        `The Action type "${action.type}" does not match any action in the pruducts reducer`,
      )
  }
}
