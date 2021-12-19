import React from "react"
import styled from "styled-components"
import { Container, ProductCard } from ".."
import { breakpoints } from "../../styles/globalStyle"

export default function ProductListing({ products = [] }) {
  return (
    <Container>
      <ProductsListingWrap>
        {products.map((p, index) => {
          console.log(p)
          return <ProductCard product={p} key={p.id} eager={index === 0} />
        })}
      </ProductsListingWrap>
    </Container>
  )
}

const ProductsListingWrap = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1rem;
  /* padding: 3rem 0; */

  @media screen and (min-width: ${breakpoints.tablet}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem 1.5rem;
  }
`
