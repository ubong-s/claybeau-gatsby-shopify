import React, { createContext, useContext, useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

const initialValues = {
  loading: false,
  listView: false,
  allProducts: [],
  filteredProducts: [],
  filters: {
    search: "",
    collection: "",
    size: "",
    maxPrice: 0,
    minPrice: 0,
    price: 0,
  },
}

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
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

  const products = data.products.nodes
  let maxPrice = Math.max(
    ...data.products.nodes.map(
      price => price.priceRangeV2.maxVariantPrice.amount
    )
  )
  const [productFilters, setProductFilters] = useState(initialValues)

  console.log(maxPrice)

  // fetch products
  const fetchProducts = () => {
    setProductFilters({
      ...productFilters,
      loading: true,
      allProducts: products,
      filteredProducts: products,
      filters: {
        ...productFilters.filters,
        price: maxPrice,
        maxPrice,
      },
      loading: false,
    })
  }

  // set List view
  const activateListView = () => {
    setProductFilters({
      ...productFilters,
      listView: true,
    })
  }

  // set Grid view
  const activateGridView = () => {
    setProductFilters({
      ...productFilters,
      listView: false,
    })
  }

  // search products
  const searchProducts = input => {
    const tempProducts = productFilters.allProducts.filter(e =>
      e.title.toLowerCase().includes(productFilters.search)
    )

    setProductFilters({
      ...productFilters,
      loading: true,
      search: input,
      filteredProducts: tempProducts,
      loading: false,
    })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <FilterContext.Provider
      value={{
        ...productFilters,
        searchProducts,
        activateListView,
        activateGridView,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
