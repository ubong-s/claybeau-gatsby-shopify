import React, { useState, createContext, useContext } from "react"

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <GlobalContext.Provider value={{ toggleMenu, menuOpen }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
