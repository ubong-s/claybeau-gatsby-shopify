import React, { useState, createContext, useContext } from "react"

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setCartOpen(false)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }
  const toggleCart = () => {
    setCartOpen(!cartOpen)
    setMenuOpen(false)
  }

  const closeCart = () => {
    setCartOpen(false)
  }

  return (
    <GlobalContext.Provider
      value={{
        toggleMenu,
        menuOpen,
        closeMenu,
        cartOpen,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
