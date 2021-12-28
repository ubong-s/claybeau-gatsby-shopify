import React, { createContext, useContext, useEffect, useState } from "react"
import { client } from "../utils/client"

const initialValues = {
  cart: [],
  isOpen: false,
  loading: false,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

const StoreContext = createContext(initialValues)

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(initialValues.checkout)
  const [loading, setLoading] = useState(false)
  const [didJustAddToCart, setDidJustAddToCart] = useState(false)

  const setCheckoutItem = checkout => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
  }

  useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const addVariantToCart = (variantId, quantity) => {
    setLoading(true)

    const checkoutID = checkout.id

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ]

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then(res => {
        setCheckout(res)
        setLoading(false)
        setDidJustAddToCart(true)
        setTimeout(() => setDidJustAddToCart(false), 3000)
      })
  }

  const removeLineItem = (checkoutID, lineItemID) => {
    setLoading(true)

    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then(res => {
        setCheckout(res)
        setLoading(false)
      })
  }

  const updateLineItem = (checkoutID, lineItemID, quantity) => {
    setLoading(true)

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then(res => {
        setCheckout(res)
        setLoading(false)
      })
  }

  return (
    <StoreContext.Provider
      value={{
        ...initialValues,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => useContext(StoreContext)
