import {
  ADD_CART_ITEM,
  REMOVE_ALL_CART_ITEMS,
  REMOVE_CART_ITEM,
  SET_ITEM_AMOUNT,
} from '../../../constants/actionTypes'

export const addItemToCart = (item) => (dispatch) => {
  dispatch({ type: ADD_CART_ITEM, payload: item })
}

export const removeItemFromCart = (id) => (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id })
}

export const removeCart = () => (dispatch) => {
  dispatch({ type: REMOVE_ALL_CART_ITEMS })
}

export const setItemAmount = (id, amount) => (dispatch) => {
  dispatch({ type: SET_ITEM_AMOUNT, payload: { id, amount } })
}
