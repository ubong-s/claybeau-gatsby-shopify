import {
  FETCH_PRODUCTS,
  ACTIVATE_GRID_VIEW,
  ACTIVATE_LIST_VIEW,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions"

const filterReducer = (state, action) => {
  if (action.type === FETCH_PRODUCTS) {
    let maxPrice = Math.max(
      ...action.payload.map(price => price.priceRangeV2.maxVariantPrice.amount)
    )

    return {
      ...state,
      allProducts: action.payload,
      filteredProducts: action.payload,
      filters: {
        ...state.filters,
        price: maxPrice,
        maxPrice,
      },
    }
  }

  if (action.type === ACTIVATE_LIST_VIEW) {
    return {
      ...state,
      listView: true,
    }
  }

  if (action.type === ACTIVATE_GRID_VIEW) {
    return {
      ...state,
      listView: false,
    }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload

    console.log(name, value)

    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state
    const { search, collection, size, color, price } = state.filters
    let tempProducts = [...allProducts]

    if (search) {
      tempProducts = tempProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (collection !== "All") {
      tempProducts = tempProducts.filter(
        product => product.productType === collection
      )
    }

    if (size !== "All") {
      let newTemp = []
      tempProducts = tempProducts.filter(product =>
        product.variants.filter(variant =>
          variant.selectedOptions.filter(option => {
            if (option.name === "Size" && option.value === size) {
              newTemp = [...newTemp, product]
            }
            /* eslint-disable  */
            return
          })
        )
      )

      tempProducts = [...new Set(newTemp)]
    }

    if (color !== "All") {
      let newTemp = []
      tempProducts = tempProducts.filter(product =>
        product.variants.filter(variant =>
          variant.selectedOptions.filter(option => {
            if (option.name === "Color" && option.value === color) {
              newTemp = [...newTemp, product]
            }

            return
          })
        )
      )

      tempProducts = [...new Set(newTemp)]
    }

    tempProducts = tempProducts.filter(
      product => product.priceRangeV2.minVariantPrice.amount <= price
    )

    console.log(tempProducts)

    return {
      ...state,
      filteredProducts: tempProducts,
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        search: "",
        collection: "All",
        size: "All",
        color: "All",
        minPrice: 0,
        price: state.filters.maxPrice,
        maxPrice: state.filters.maxPrice,
      },
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filterReducer
