import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  CALCULATE_TOTALS,
  RESTORE_CART_STATE,
  STORE_CART_STATE,
} from '../../constants/actionTypes'

//local imports
import { cartInitialState } from './initial-states/cart-initial-state'
import { componentInitialState } from './initial-states/components-initial-state'
import { cartReducer } from './reducers/cart-reducer'
import { componentReducer } from './reducers/component-reducer'

const GlobalStateContext = createContext()
const GlobalDispatchContext = createContext()

export const useGlobaleStateContext = () => {
  return useContext(GlobalStateContext)
}

export const useGlobaleDispatchContext = () => {
  return useContext(GlobalDispatchContext)
}

export const GlobalContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState)
  const [componentState, componentDispatch] = useReducer(
    componentReducer,
    componentInitialState,
  )

  //use effect to restore the cart state where the component mount
  useEffect(() => {
    cartDispatch({ type: RESTORE_CART_STATE })
  }, [])

  //store the cart each time it is changed
  useEffect(() => {
    cartDispatch({ type: STORE_CART_STATE })
  }, [cartState])

  const cartItems = cartState.cartItems

  //here we use the deepCompareEffect because we have a deep object in the state we want to store.
  useEffect(() => {
    cartDispatch({ type: CALCULATE_TOTALS })
  }, [cartItems])

  return (
    <GlobalStateContext.Provider
      value={{
        cartState,
        componentState,
      }}
    >
      {/* we are using a dispatch context provider to avoid envoking dispatch and states at the same call */}
      <GlobalDispatchContext.Provider
        value={{
          cartDispatch,
          componentDispatch,
        }}
      >
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}
