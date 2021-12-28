import React from "react"
import { Link } from "gatsby"
import { BsBagCheckFill } from "react-icons/bs"
import { RiCloseCircleFill } from "react-icons/ri"
import styled from "styled-components"
import { theme } from "../../styles/globalStyle"
import { useGlobalContext } from "../../context/globalContext"

export default function CartBtn({ quantity }) {
  const { toggleCart, cartOpen } = useGlobalContext()

  return (
    <CartBtnWrap
      aria-label={`Shopping Cart with ${quantity} items`}
      onClick={toggleCart}
    >
      <button type="button" className="small-btn">
        <BsBagCheckFill />
        {quantity > 0 && <div className="badge">{quantity}</div>}
      </button>
    </CartBtnWrap>
  )
}

// {
//   cartOpen ? (
//     <button type="button" className="small-btn">
//       <RiCloseCircleFill className="icon" />
//     </button>
//   ) : (
//     <button type="button" className="small-btn">
//       <BsBagCheckFill />
//       {quantity > 0 && <div className="badge">{quantity}</div>}
//     </button>
//   )
// }

const CartBtnWrap = styled.div`
  button {
    position: relative;
  }

  .icon {
    color: ${theme.colors.primary};
  }

  .badge {
    position: absolute;
    top: 30%;
    left: 50%;
    background: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    font-weight: ${theme.weights.bold};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    line-height: 0;
    font-size: 1.1rem;
    padding: 0;
    margin: 0;
  }
`
