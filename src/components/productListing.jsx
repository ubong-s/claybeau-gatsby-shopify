import React from "react"
import styled from "styled-components"
import { ProductCard } from "."

export default function ProductListing({ products = [] }) {
  return (
    <ProductsListingWrap className="univ-container">
      {products.map((p, index) => (
        <ProductCard product={p} key={p.id} eager={index === 0} />
      ))}
    </ProductsListingWrap>
  )
}

const ProductsListingWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1rem;
  padding: 3rem 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem 1.5rem;
  }
`
