import React, { createContext, useContext } from "react"
import { client } from "../utils/client"

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={"hello"}>{children}</StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext)
