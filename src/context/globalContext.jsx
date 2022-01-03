import React, { createContext, useContext, useReducer } from "react"
import reducer from "../reducers/globalReducer"
import { TOGGLE_CART, TOGGLE_MENU, CLOSE_CART, CLOSE_MENU } from "../actions"

const initialState = {
  menuOpen: false,
  cartOpen: false,
}
const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const toggleMenu = () => {
    dispatch({ type: TOGGLE_MENU })
  }

  const closeMenu = () => {
    dispatch({ type: CLOSE_MENU })
  }
  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART })
  }

  const closeCart = () => {
    dispatch({ type: CLOSE_CART })
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        toggleMenu,
        closeMenu,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
