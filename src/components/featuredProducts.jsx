import React from "react"
import styled from "styled-components"
import { ProductCard } from "."

export default function FeaturedProducts({ products = [] }) {
  return (
    <FeaturedProductsWrap className="univ-container">
      <h2 className="univ-section-title">Full of Style</h2>
      <FeaturedProductsInner>
        {products.map((p, index) => (
          <ProductCard product={p} key={p.id} eager={index === 0} />
        ))}
      </FeaturedProductsInner>
    </FeaturedProductsWrap>
  )
}

const FeaturedProductsWrap = styled.section``
const FeaturedProductsInner = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1rem;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem 1.5rem;
  }
`
