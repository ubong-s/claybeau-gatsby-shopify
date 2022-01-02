import React from "react"
import styled from "styled-components"
import { breakpoints, dimensions, theme } from "../../styles/globalStyle"
import { useGlobalContext } from "../../context/globalContext"
import { useStoreContext } from "../../context/storeContext"
import { Button, CartItem } from "../../components"
import { formatPrice } from "../../utils/formatPrice"

export default function Cart() {
  const { cartOpen, closeCart } = useGlobalContext()
  const { checkout, loading } = useStoreContext()
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <CartWrap className={cartOpen && "opened"}>
      {/* <CloseCart /> */}
      {emptyCart ? (
        <CartEmpty>
          <h2>Your Cart is Empty</h2>
          <p>Visit our catalog to fill it up</p>
          {/* eslint-disable */}
          <div onClick={closeCart}>
            <Button
              title="Catalog"
              url="/products"
              buttonColor={theme.colors.secondary}
            />
          </div>
        </CartEmpty>
      ) : (
        <CartInner>
          <CartItemsWrap
            className={checkout.lineItems.length > 4 && "two-columns"}
          >
            {checkout.lineItems.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </CartItemsWrap>
          <CheckoutInfo>
            <p>
              <span>Tax:</span>{" "}
              {formatPrice(
                checkout.totalTaxV2.currencyCode,
                checkout.totalTaxV2.amount
              )}
            </p>
            <p>
              <span>Shipping:</span> Calculated at checkout
            </p>
            <p>
              <span>Total:</span>{" "}
              {formatPrice(
                checkout.totalPriceV2.currencyCode,
                checkout.totalPriceV2.amount
              )}
            </p>
          </CheckoutInfo>

          <CheckoutBtn
            onClick={handleCheckout}
            disabled={loading}
            className="generic-button"
          >
            Proceed to Checkout{" "}
            {formatPrice(
              checkout.totalPriceV2.currencyCode,
              checkout.totalPriceV2.amount
            )}
          </CheckoutBtn>
        </CartInner>
      )}
    </CartWrap>
  )
}

const CartWrap = styled.div`
  position: fixed;
  top: ${dimensions.headerHeight.mobile};
  right: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.white};
  z-index: 1000;
  transform: translateX(100%);
  transition: ${theme.misc.transitionEase};
  border-top: 2px solid ${theme.colors.primary};
  padding: 2rem 1rem 1rem;
  background: ${theme.colors.gray1};
  overflow: scroll;

  &.opened {
    transform: translateX(0);
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    top: ${dimensions.headerHeight.desktop};
    width: ${dimensions.cartWidthDesktop};
  }
`
const CartEmpty = styled.div`
  text-align: center;
`
const CartInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  min-height: 100vh;
  padding-bottom: 4rem;
`

const CheckoutInfo = styled.div`
  text-align: right;

  p {
    color: ${theme.colors.secondary};
    margin-bottom: 0.5rem;
    font-weight: ${theme.weights.bold};

    span {
      font-weight: ${theme.weights.normal};
    }
  }
`

const CartItemsWrap = styled.div`
  display: grid;
  gap: 1.25rem;
`
const CheckoutBtn = styled.button`
  /* position: absolute; */
  padding: 0.75rem;
  /* bottom: 0; */
  /* left: 0; */
  /* width: 100%; */
  /* background: red; */

  &:hover {
    background: ${theme.colors.secondary};
    color: ${theme.colors.white};
  }
`
