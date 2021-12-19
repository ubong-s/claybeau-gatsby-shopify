import React from "react"
import styled from "styled-components"
import { GoBackDesktop } from ".."
import { breakpoints, dimensions, theme } from "../../styles/globalStyle"

export default function ProductDetails({ title, description, price }) {
  return (
    <ProductContent>
      <GoBackDesktop />
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="price">{}</div>
    </ProductContent>
  )
}

const ProductContent = styled.div`
  position: relative;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    position: sticky;
    top: 9rem;
    display: flex;
    flex-direction: column;
    height: calc(100vh - ${dimensions.headerHeight.desktop} - 8rem);
    justify-content: center;

    h1 {
      font-size: ${theme.headings.xlarge};
    }
  }
`
