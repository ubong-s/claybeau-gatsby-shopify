import React, { useState } from "react"
import styled from "styled-components"
import { ListGridToggle, Button } from ".."
import { theme } from "../../styles/globalStyle"
import { IoFilterSharp } from "react-icons/io5"
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { breakpoints } from "../../styles/globalStyle"
import { useFilterContext } from "../../context/filterContext"

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
}

export default function FilterForm() {
  const { allProducts, price, filters } = useFilterContext()
  const [toggleSizes, setToggleSizes] = useState(false)
  const [toggleColors, setToggleColors] = useState(false)
  const { minPrice, maxPrice } = filters

  const controlSizes = () => {
    setToggleSizes(!toggleSizes)
  }

  const controlColors = () => {
    setToggleColors(!toggleColors)
  }

  const getUniqueVariant = (allProducts = allProducts, input) => {
    return [
      ...new Set(
        allProducts
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
  const sizes = getUniqueVariant(allProducts, "size")

  // get unique colors
  const colors = getUniqueVariant(allProducts, "color")

  return (
    <FilterFormWrap>
      <MobileFilter>
        {/* <IoFilterSharp /> */}
        <div className="line"></div>
        <ListGridToggle />
      </MobileFilter>
      <DesktopFilter>
        <Form>
          <FormGroup>
            <label htmlFor="collections" className="title">
              Collections
            </label>
            <select name="collections" id="collections">
              {collections.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <div htmlFor="price" className="title">
              Price
            </div>
            <div className="price">
              <input
                type="number"
                name="min-price"
                id="min-price"
                // onChange={updateFilters}
                placeholder={minPrice}
                value={minPrice}
                min={minPrice}
                max={maxPrice}
              />
              {/* <div className="line"></div> */}
              <input
                type="number"
                name="max-price"
                id="max-price"
                placeholder={maxPrice}
                value={maxPrice}
                max={maxPrice}
              />
            </div>
          </FormGroup>
          <FormGroup className={toggleSizes && "opened"}>
            <div className="title">
              Sizes{" "}
              <span>
                <FaChevronDown
                  className="toggle-icon sizes"
                  onClick={controlSizes}
                />
              </span>
            </div>
            <div className="sizes">
              {sizes.map((size, index) => {
                return (
                  <label htmlFor="sizes" key={index} className="checkbox-wrap">
                    <input type="checkbox" value={size} />
                    <span className="checkmark">{size}</span>
                  </label>
                )
              })}
            </div>
          </FormGroup>
          <FormGroup className={toggleColors && "opened"}>
            <div className="title">
              Colors{" "}
              <span>
                <FaChevronDown
                  className="toggle-icon colors"
                  onClick={controlColors}
                />
              </span>
            </div>
            <div className="colors">
              {colors.map((color, index) => {
                return (
                  <label htmlFor="colors" key={index} className="checkbox-wrap">
                    <input type="checkbox" value={color} />
                    <span
                      style={{ backgroundColor: `${color}` }}
                      className="checkmark"
                    >
                      <FaCheck className="icon" />
                    </span>
                  </label>
                )
              })}
            </div>
          </FormGroup>
        </Form>
        <div>
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
    border: ${theme.colors.gray4} 2px solid;
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
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: center;

    input {
      font-family: ${theme.fonts.secondary};
      font-size: 1rem;
      width: 100%;
      height: 2.3rem;
      border-radius: ${theme.roundings.medium};
      color: ${theme.colors.secondary};
      border: ${theme.colors.gray4} solid 2px;
      padding: 0 0.5rem;
    }
  }

  /* Colors checkbox styles */
  .colors {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem 0.75rem;

    .checkbox-wrap {
      ​display: block;
      position: relative;
      height: 2.3rem;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 100%;
        width: 100%;
        z-index: 1;

        &:checked ~ .checkmark {
          border: ${theme.colors.secondary} 1px solid;

          .icon {
            display: block;
          }
        }
      }

      .checkmark {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: ${theme.roundings.medium};
        border: ${theme.colors.gray3} 1px solid;

        .icon {
          display: none;
        }
      }
    }
  }

  /* Sizes checkbox styles */
  .sizes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    .checkbox-wrap {
      ​display: block;
      position: relative;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      height: 2.3rem;
      /* margin-bottom:1rem; */

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 100%;
        width: 100%;
        z-index: 1;

        &:checked ~ .checkmark {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: none;
        }
      }

      .checkmark {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.3rem;
        color: ${theme.colors.secondary};
        border: ${theme.colors.gray4} solid 2px;
        font-weight: ${theme.weights.bold};
        border-radius: ${theme.roundings.medium};
      }
    }
  }
`
