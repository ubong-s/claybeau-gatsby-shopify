import { TOGGLE_MENU, TOGGLE_CART, CLOSE_CART, CLOSE_MENU } from "../actions"

const globalReducer = (state, action) => {
  if (action.type === TOGGLE_MENU) {
    return {
      ...state,
      menuOpen: !state.menuOpen,
      cartOpen: false,
    }
  }

  if (action.type === CLOSE_MENU) {
    return {
      ...state,
      menuOpen: false,
    }
  }

  if (action.type === TOGGLE_CART) {
    return {
      ...state,
      menuOpen: false,
      cartOpen: !state.cartOpen,
    }
  }

  if (action.type === CLOSE_CART) {
    return {
      ...state,
      cartOpen: false,
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default globalReducer
