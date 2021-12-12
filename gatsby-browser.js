import * as React from "react"
import { GlobalProvider } from "./src/context/globalContext"
import { StoreProvider } from "./src/context/storeContext"

export const wrapRootElement = ({ element }) => (
  <GlobalProvider>
    <StoreProvider>{element}</StoreProvider>
  </GlobalProvider>
)
