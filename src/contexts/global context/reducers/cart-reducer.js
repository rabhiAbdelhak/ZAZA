import {
  ADD_CART_ITEM,
  CALCULATE_TOTALS,
  REMOVE_ALL_CART_ITEMS,
  REMOVE_CART_ITEM,
  RESTORE_CART_STATE,
  SET_ITEM_AMOUNT,
  STORE_CART_STATE,
} from '../../../constants/actionTypes'

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const newItem = action.payload
      const existed = state.cartItems.find((item) => item.id === newItem.id)
      return !existed
        ? { ...state, cartItems: [...state.cartItems, newItem] }
        : state
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      }
    case REMOVE_ALL_CART_ITEMS:
      return { ...state, cartItems: [] }
    case RESTORE_CART_STATE:
      const cart = localStorage.getItem('cart')
      return cart ? JSON.parse(cart) : state
    case STORE_CART_STATE:
      localStorage.setItem('cart', JSON.stringify(state))
      return state
    case SET_ITEM_AMOUNT:
      const { amount, id } = action.payload
      const cartItems = state.cartItems.map((item) => {
        return item.id === id ? { ...item, amount } : item
      })
      return { ...state, cartItems }
    case CALCULATE_TOTALS:
      const totalQuantity = state.cartItems.reduce((accu, item) => {
        return accu + item.amout
      }, 0)
      const totalPrice = state.cartItems.reduce((accu, item) => {
        return accu + item.price * item.amount
      }, 0)
      const totalItems = state.cartItems.length
      const totalSellingPrice = state.cartItems.reduce((accu, item) => {
        return accu + item.sellingPrice * item.amount
      }, 0)

      return {
        ...state,
        totalItems,
        totalQuantity,
        totalPrice,
        totalSellingPrice,
      }
    default:
      throw new Error('No Action Match this type !')
  }
}
