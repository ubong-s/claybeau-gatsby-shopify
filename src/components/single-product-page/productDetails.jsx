import React, { useEffect } from "react"
import { FaCheck } from "react-icons/fa"
import styled from "styled-components"
import { breakpoints, dimensions, theme } from "../../styles/globalStyle"
import { useStoreContext } from "../../context/storeContext"
import { GoBackDesktop, NumericInput } from ".."

export default function ProductDetails({
  title,
  description,
  price,
  options,
  hasVariants,
  selectOption,
  variant,
  variants,
  quantity,
  setQuantity,
  variantId,
  available,
}) {
  const { addVariantToCart, loading } = useStoreContext()

  function addToCart(e) {
    e.preventDefault()
    addVariantToCart(variantId, quantity)
  }

  const availableQty = variants.find(
    e => e.storefrontId === variant.storefrontId
  ).inventoryQuantity

  const increaseQty = () => setQuantity(q => Math.min(q + 1, availableQty))

  const decreaseQty = () => setQuantity(q => Math.max(1, q - 1))

  useEffect(() => {
    if (quantity > availableQty) setQuantity(availableQty)
    if (quantity === 0 && availableQty > 0) setQuantity(1)
    /* eslint-disable */
  }, [availableQty, quantity])

  return (
    <ProductContent>
      <GoBackDesktop />
      <h1>{title}</h1>
      <p>{description}</p>
      <PriceQty>
        <h2 className="price">{price}</h2>
        <p>{availableQty < 1 ? "Out of stock" : `${availableQty} in stock`} </p>
      </PriceQty>
      <ColorsSizes>
        {hasVariants &&
          options.map(({ id, name, values }, index) => (
            <OptionsWrap key={id} aria-label={name}>
              <h4>{name}</h4>
              {values.map(value =>
                name === "Color" ? (
                  <Color
                    data-value={value}
                    key={`${name}-${value}`}
                    colorValue={value}
                    onClick={event => selectOption(index, event)}
                    className={
                      variant.selectedOptions.find(e => e.name === "Color")
                        .value === value && "active"
                    }
                  >
                    {variant.selectedOptions.find(e => e.name === "Color")
                      .value === value && <FaCheck />}
                  </Color>
                ) : (
                  <Option
                    data-value={value}
                    key={`${name}-${value}`}
                    onClick={event => selectOption(index, event)}
                    className={
                      variant.selectedOptions.find(e => e.name === "Size")
                        .value === value && "active"
                    }
                  >
                    {value}
                  </Option>
                )
              )}
            </OptionsWrap>
          ))}
      </ColorsSizes>
      <QuantityCart>
        <NumericInput
          aria-label="Quantity"
          availableQty={availableQty}
          value={quantity}
          // setQuantity={setQuantity}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          onChange={event => setQuantity(event.currentTarget.value)}
          min="1"
          max="20"
        />

        <AddToCart
          type="submit"
          onClick={addToCart}
          disabled={!available || loading}
        >
          {availableQty < 1 ? "Out of Stock" : "Add to Cart"}
        </AddToCart>
      </QuantityCart>
    </ProductContent>
  )
}

const ProductContent = styled.div`
  position: relative;

  p {
    margin-bottom: 0;
    font-size: 0.95rem;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    position: sticky;
    top: 9rem;
    display: flex;
    flex-direction: column;
    height: calc(100vh - ${dimensions.headerHeight.desktop} - 8rem);
    justify-content: center;

    h1 {
      font-size: ${theme.headings.large};
      line-height: 1.1;
    }

    p {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: ${breakpoints.hd}px) {
    h1 {
      font-size: ${theme.headings.xlarge};
      line-height: 1.1;
    }
  }
`

const PriceQty = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  .price {
    font-size: ${theme.headings.large};
  }
`
const OptionsWrap = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  h4 {
    /* font-family: ${theme.fonts.secondary}; */
    margin: 0;
    margin-right: 1rem;
  }
`

const ColorsSizes = styled.div`
  display: grid;
  gap: 1rem;
`
const Color = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ colorValue }) => colorValue};
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 10;
  }

  &.active {
    border: 2px solid ${theme.colors.primary};
  }
`
const Option = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  width: 30px;
  height: 30px;
  background: ${theme.colors.white};
  color: ${theme.colors.secondary};
  border-radius: 50%;
  box-shadow: ${theme.misc.shadow};
  font-size: 0.8rem;

  &.active {
    border: 2px solid ${theme.colors.primary};
  }
`

const QuantityCart = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`

const AddToCart = styled.button`
  cursor: pointer;
  height: 2.5rem;
  font-size: ${theme.sizes.small};
  font-family: ${theme.fonts.secondary};
  font-weight: ${theme.weights.bold};
  outline: none;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border-radius: ${theme.roundings.large};
  border: none;
  transition: ${theme.misc.transitionEase};
  text-transform: capitalize;
  letter-spacing: 1.5px;
  padding: 0 1rem;

  &:hover {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
  }

  &:disabled:hover,
  &:disabled {
    background: ${theme.colors.gray4};
    color: ${theme.colors.secondary};
    cursor: not-allowed;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    font-size: ${theme.sizes.medium};
    height: 2.75rem;
  }
`
