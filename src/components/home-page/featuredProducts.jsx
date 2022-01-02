import React from "react"
import styled from "styled-components"
import { ProductCard, Container, Button } from ".."
import { useFilterContext } from "../../context/filterContext"
import { theme } from "../../styles/globalStyle"

export default function FeaturedProducts({ products = [] }) {
  const { listView } = useFilterContext()

  return (
    <FeaturedProductsWrap>
      <Container>
        <FeaturedTop>
          <h2>Our Latest Products</h2>
          <Button
            title="View All"
            url="/products"
            color={theme.colors.secondary}
          />
        </FeaturedTop>
        <FeaturedProductsInner className={listView && "list"}>
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

const FeaturedProductsWrap = styled.section`
  text-align: center;
`
const FeaturedTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const FeaturedProductsInner = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1rem;
  text-align: initial;

  &.list {
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem 1.5rem;

    &.list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`
