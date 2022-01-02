import React, { useState } from "react"
import styled from "styled-components"
import { ListGridToggle, Button } from ".."
import { theme } from "../../styles/globalStyle"
import { FaCheck, FaChevronDown } from "react-icons/fa"
import { breakpoints } from "../../styles/globalStyle"
import { useFilterContext } from "../../context/filterContext"

export default function FilterForm() {
  const {
    allProducts,
    filters: { collection, size, color, minPrice, maxPrice, price },
    clearFilters,
    updateFilters,
  } = useFilterContext()
  const [toggleSizes, setToggleSizes] = useState(false)
  const [toggleColors, setToggleColors] = useState(false)

  const controlSizes = () => {
    setToggleSizes(!toggleSizes)
  }

  const controlColors = () => {
    setToggleColors(!toggleColors)
  }

  const getUniqueVariant = (productsArr = [], input) => {
    return [
      "All",
      ...new Set(
        productsArr
          .map(product =>
            product.variants.map(
              variant =>
                variant.selectedOptions
                  .filter(
                    option => option.name.toLowerCase() === input.toLowerCase()
                  )
                  .find(e => e.value).value
            )
          )
          .join()
          .split(",")
      ),
    ]
  }

  // get unique collections
  let collections = [
    "All",
    ...new Set(allProducts.map(product => product.productType)),
  ]

  // get unique sizes
  const allSizes = getUniqueVariant(allProducts, "size")

  // get unique colors
  const allColors = getUniqueVariant(allProducts, "color")

  return (
    <FilterFormWrap>
      <MobileFilter>
        {/* <IoFilterSharp /> */}
        <div className="line"></div>
        <ListGridToggle />
      </MobileFilter>
      <DesktopFilter>
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup>
            <label htmlFor="collections" className="title">
              Collections
            </label>
            <select
              name="collection"
              id="collections"
              onChange={updateFilters}
              value={collection}
            >
              {collections.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <div className="title">
              Price
              <small>${price}</small>
            </div>
            <div className="price">
              <input
                type="range"
                name="price"
                onChange={updateFilters}
                min={minPrice}
                max={maxPrice}
                value={price}
              />
            </div>
          </FormGroup>
          <FormGroup className={toggleSizes && "opened"}>
            <div className="title">
              Sizes{" "}
              <span>
                <FaChevronDown
                  className={
                    toggleSizes
                      ? "toggle-icon sizes active"
                      : "toggle-icon sizes"
                  }
                  onClick={controlSizes}
                />
              </span>
            </div>
            <div className="sizes">
              {allSizes.map((s, index) => {
                if (s === "All") {
                  return (
                    <button
                      name="size"
                      key={index}
                      className={`${size === s ? "all-btn active" : "all-btn"}`}
                      data-size="All"
                      onClick={updateFilters}
                    >
                      all
                    </button>
                  )
                }

                return (
                  <button
                    name="size"
                    key={index}
                    className={`${size === s ? "all-btn active" : "all-btn"}`}
                    data-size={s}
                    onClick={updateFilters}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </FormGroup>
          <FormGroup className={toggleColors && "opened"}>
            <div className="title">
              Colors{" "}
              <span>
                <FaChevronDown
                  className={
                    toggleColors
                      ? "toggle-icon colors active"
                      : "toggle-icon colors"
                  }
                  onClick={controlColors}
                />
              </span>
            </div>
            <div className="colors">
              {allColors.map((c, index) => {
                if (c === "All") {
                  return (
                    <button
                      name="color"
                      key={index}
                      className={`${
                        color === c ? "all-btn active" : "all-btn"
                      }`}
                      data-color="All"
                      onClick={updateFilters}
                    >
                      all
                    </button>
                  )
                }

                return (
                  <button
                    name="color"
                    key={index}
                    className={`${
                      color === c ? "all-btn color-active" : "all-btn"
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                    style={{ backgroundColor: c }}
                  >
                    {color === c ? <FaCheck className="icon" /> : null}
                  </button>
                )
              })}
            </div>
          </FormGroup>
        </Form>

        {/* eslint-disable  */}
        <div onClick={clearFilters}>
          <Button title="Clear Filters" />
        </div>
        <ListGridToggle />
      </DesktopFilter>
    </FilterFormWrap>
  )
}

const FilterFormWrap = styled.div`
  margin-top: 2rem;

  display: grid;

  .line {
    height: 1px;
    background: ${theme.colors.secondary};
    opacity: 0.2;
    width: 100%;
  }
`

const MobileFilter = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  /* grid-template-columns: auto 1fr auto; */
  align-items: center;
  gap: 1rem;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: none;
  }
`
const DesktopFilter = styled.div`
  display: none;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 1rem;
  }
`
const Form = styled.form`
  display: grid;
  align-items: flex-start;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  padding: 1rem 1.25rem 1.25rem;
  border-radius: ${theme.roundings.large};
  height: 108px;
  overflow: hidden;
  transition: ${theme.misc.transitionEase};

  &.opened {
    position: relative;
    height: auto;
    overflow: unset;
    z-index: 10;
  }

  /* Form Group Headers */
  .title {
    font-weight: ${theme.weights.semiBold};
    margin-bottom: 0.7rem;
    color: ${theme.colors.secondary};
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* Toggle icon for more options */
    .toggle-icon {
      cursor: pointer;
      transition: ${theme.misc.transitionEase};

      &:hover {
        color: ${theme.colors.primary};
      }

      &.active {
        color: ${theme.colors.primary};
      }
    }
  }

  .all-btn {
    display: block;
    position: relative;
    height: 2.3rem;
    font-family: ${theme.fonts.secondary};
    font-weight: ${theme.weights.bold};
    border-radius: ${theme.roundings.medium};
    border: ${theme.colors.gray3} 1px solid;
    color: ${theme.colors.secondary};
    background-color: ${theme.colors.gray1};
    outline: none;
    cursor: pointer;
    transition: ${theme.misc.transitionEase};

    &:hover {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
      border: transparent;
    }

    &.active,
    .color-active {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
      border: transparent;
    }

    &.color-active {
      border: ${theme.colors.primary} 2px solid;
    }

    .icon {
      color: ${theme.colors.gray6};
    }
  }

  /* Collection Dropdown styles */
  #collections {
    position: relative;
    font-family: ${theme.fonts.secondary};
    font-size: 1rem;
    padding: 0.4rem 1rem 0.4rem;
    outline: none;
    border-radius: ${theme.roundings.medium};
    border: ${theme.colors.primary} 1px solid;
    color: ${theme.colors.secondary};
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 98%;
    background-position-y: 5px;
  }

  /* Price styles */
  .price {
    display: grid;
    align-items: center;
    height: 100%;

    input {
      &[type="range"] {
        -webkit-appearance: none;
        margin: 18px 0;
        width: 100%;

        &:focus {
          outline: none;

          &::-webkit-slider-runnable-track {
            background: ${theme.colors.secondary};
          }
          &::-moz-range-track {
            background: ${theme.colors.secondary};
          }

          &::-webkit-slider-thumb {
            border: 2px solid ${theme.colors.primary};
          }

          &::-moz-range-thumb {
            border: 2px solid ${theme.colors.primary};
          }
        }

        &::-webkit-slider-runnable-track {
          width: 100%;
          height: 1px;
          cursor: pointer;
          background: ${theme.colors.primary};
          border: none;
        }

        &::-webkit-slider-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          cursor: pointer;
          background: ${theme.colors.white};
          border: 2px solid ${theme.colors.secondary};
          -webkit-appearance: none;
          margin-top: -10px;
        }
        &::-moz-range-track {
          width: 100%;
          height: 1px;
          cursor: pointer;
          background: ${theme.colors.primary};
          border: none;
        }

        &::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -10px;
          background: ${theme.colors.white};
          border: 2px solid ${theme.colors.secondary};
        }
      }
    }
  }

  /* Colors checkbox styles */
  .colors {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem 0.75rem;
  }

  /* Sizes checkbox styles */
  .sizes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`
