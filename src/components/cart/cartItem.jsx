import React, { useState, useMemo } from "react"
import debounce from "lodash.debounce"
import { useStoreContext } from "../../context/storeContext"
import { formatPrice } from "../../utils/formatPrice"
import { getShopifyImage } from "gatsby-source-shopify"
import { GatsbyImage } from "gatsby-plugin-image"
import { AiFillDelete } from "react-icons/ai"
import { NumericInput } from ".."
import styled from "styled-components"
import { theme } from "../../styles/globalStyle"

export default function CartItem({ item }) {
  const { checkout, removeLineItem, updateLineItem, loading } =
    useStoreContext()
  const [quantity, setQuantity] = useState(item.quantity)

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  }

  const price = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount)
  )

  const subtotal = formatPrice(
    item.variant.priceV2.currencyCode,
    Number(item.variant.priceV2.amount) * quantity
  )

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    value => updateLineItem(checkout.id, item.id, value),
    300
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback(value => uli(value), [])

  const handleQuantityChange = value => {
    if (value !== "" && Number(value) < 1) {
      return
    }
    setQuantity(value)
    if (Number(value) >= 1) {
      debouncedUli(value)
    }
  }

  function increaseQty() {
    handleQuantityChange(Number(quantity || 0) + 1)
  }

  function decreaseQty() {
    handleQuantityChange(Number(quantity || 0) - 1)
  }

  const image = useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        crop: "contain",
        width: 75,
        height: 75,
      }),
    [variantImage.src]
  )

  return (
    <CartItemWrap>
      <ImageWrap>
        {image && (
          <GatsbyImage
            key={variantImage.src}
            image={image}
            alt={variantImage.altText ?? item.variant.title}
          />
        )}
      </ImageWrap>
      <Content>
        <TopWrap>
          <div>
            <div>
              <h3>{item.title}</h3>
              <p>
                {item.variant.title === "Default Title"
                  ? ""
                  : item.variant.title}
              </p>
            </div>
          </div>
          <div className="price">{price}</div>
        </TopWrap>
        <BtmWrap>
          <NumericInput
            aria-label="Quantity"
            disabled={loading}
            value={quantity}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            onChange={event => setQuantity(event.currentTarget.value)}
            min="1"
            max="20"
          />

          <div className="subtotal">{subtotal}</div>
        </BtmWrap>
        <button onClick={handleRemove} className="generic-button remove">
          <AiFillDelete className="icon" /> remove
        </button>
      </Content>
    </CartItemWrap>
  )
}

const CartItemWrap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  gap: 1rem;

  .price,
  .subtotal {
    /* font-family: ${theme.fonts.primary}; */
    color: ${theme.colors.secondary};
    font-weight: ${theme.weights.bold};
    margin-bottom: 0;
  }
`
const ImageWrap = styled.div`
  .gatsby-image-wrapper {
    border-radius: ${theme.roundings.small};
    overflow: hidden;
    line-height: 0;
  }
`

const Content = styled.div`
  display: grid;
  gap: 0.35rem;

  .remove {
    font-size: ${theme.sizes.xsmall};
    margin-bottom: 0;
    padding: 0.25rem 0.5rem;
    /* align-self: center; */
    justify-self: flex-end;

    .icon {
      padding: 0;
      margin: 0;
      margin-bottom: -0.15rem;
    }

    &:hover {
      background: ${theme.colors.secondary};
      color: ${theme.colors.white};
    }
  }
`
const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  h3 {
    font-size: ${theme.sizes.small};
    font-family: ${theme.fonts.secondary};
    font-weight: ${theme.weights.bold};
    margin-bottom: 0;
  }

  p {
    font-size: ${theme.sizes.xsmall};
    margin-bottom: 0;
  }
`
const BtmWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
