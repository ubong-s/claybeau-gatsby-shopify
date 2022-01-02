import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useStaticQuery, graphql } from "gatsby"
import reducer from "../reducers/filterReducer"
import {
  FETCH_PRODUCTS,
  ACTIVATE_GRID_VIEW,
  ACTIVATE_LIST_VIEW,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions"

const initialState = {
  loading: false,
  listView: false,
  allProducts: [],
  filteredProducts: [],
  filters: {
    search: "",
    collection: "All",
    size: "All",
    color: "All",
    maxPrice: 0,
    minPrice: 0,
    price: 0,
  },
}

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const data = useStaticQuery(graphql`
    {
      products: allShopifyProduct {
        nodes {
          id
          storefrontId
          title
          priceRangeV2 {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          productType
          variants {
            selectedOptions {
              name
              value
            }
          }
          ...ProductCard
        }
      }
    }
  `)

  // set List view
  const activateListView = () => {
    dispatch({ type: ACTIVATE_LIST_VIEW })
  }

  // set Grid view
  const activateGridView = () => {
    dispatch({ type: ACTIVATE_GRID_VIEW })
  }

  const updateFilters = e => {
    let name = e.target.name
    let value = e.target.value

    if (name === "price") {
      value = Number(value)
    }

    if (name === "size") {
      value = e.target.dataset.size
    }

    if (name === "color") {
      value = e.target.dataset.color
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  useEffect(() => {
    dispatch({ type: FETCH_PRODUCTS, payload: data.products.nodes })
    /* eslint-disable */
  }, [])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
  }, [state.allProducts, state.filters])

  return (
    <FilterContext.Provider
      value={{
        ...state,
        activateListView,
        activateGridView,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
