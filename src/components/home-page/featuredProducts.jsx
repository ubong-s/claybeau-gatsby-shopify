import React from "react"
import styled from "styled-components"
import { ProductCard, Container } from ".."

export default function FeaturedProducts({ products = [] }) {
  return (
    <FeaturedProductsWrap>
      <Container>
        <FeaturedProductsInner>
          {products.map((p, index) => (
            <ProductCard
              product={p}
              key={p.id}
              eager={index === 0}
              hideDesc="true"
              normalSize="true"
            />
          ))}
        </FeaturedProductsInner>
      </Container>
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
