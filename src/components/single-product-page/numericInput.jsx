import React from "react"
import styled from "styled-components"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import { theme, breakpoints } from "../../styles/globalStyle"

export default function NumericInput({
  availableQty,
  setQuantity,
  increaseQty,
  decreaseQty,
  ...props
}) {
  return (
    <NumericInputWrap aria-label="Quantity">
      <input
        type="number"
        disabled={availableQty < 1}
        className="input"
        {...props}
      />
      <button
        disabled={availableQty < 1}
        className="increase"
        aria-label="increase"
        onClick={increaseQty}
      >
        <span>+</span>
        <MdArrowDropUp />
      </button>
      <button
        disabled={availableQty < 1}
        className="decrease"
        aria-label="decrease"
        onClick={decreaseQty}
      >
        <span>-</span>
        <MdArrowDropDown />
      </button>
    </NumericInputWrap>
  )
}

const NumericInputWrap = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr min-content;
  grid-template-areas: "input increase" "input decrease";
  align-items: center;
  justify-items: center;
  border-radius: ${theme.roundings.large};
  height: 2.5rem;
  overflow: hidden;
  border-width: 1px;

  button span {
    display: none;
  }

  .input {
    grid-area: input;
    background: ${theme.colors.white};
    border: none;
    align-self: stretch;
    font-weight: ${theme.weights.bold};
    font-family: ${theme.fonts.secondary};
    color: ${theme.colors.secondary};
    padding-left: 0.75rem;
    display: flex;
    align-items: center;

    &:disabled {
      color: ${theme.colors.primary};
    }

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: ${theme.colors.primary};
    border: none;
    padding: 0.2rem;
    display: grid;
    place-items: center;
    color: ${theme.colors.secondary};
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.primary};
    }

    &:disabled,
    &:disabled:hover {
      background: none;
      color: ${theme.colors.gray4};
      cursor: not-allowed;
    }

    &.increase {
      grid-area: increase;
      border-bottom: 1px solid ${theme.colors.white};
      height: 100%;
    }

    &.decrease {
      grid-area: decrease;
      height: 100%;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    height: 2.75rem;

    .input {
      font-size: 1.1rem;
      padding-left: 1rem;
    }
  }
`
