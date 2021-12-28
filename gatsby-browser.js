import * as React from "react"
import { GlobalProvider } from "./src/context/globalContext"
import { StoreProvider } from "./src/context/storeContext"
import { FilterProvider } from "./src/context/filterContext"

export const wrapRootElement = ({ element }) => (
  <GlobalProvider>
    <StoreProvider>
      <FilterProvider>{element}</FilterProvider>
    </StoreProvider>
  </GlobalProvider>
)
