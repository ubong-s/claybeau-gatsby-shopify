import React from "react"
import styled from "styled-components"
import { Container, ProductCard } from ".."
import { breakpoints } from "../../styles/globalStyle"
import { useFilterContext } from "../../context/filterContext"

export default function ProductListing({ products = [] }) {
  const { loading, listView } = useFilterContext()

  if (loading) {
    return (
      <ProductsEmpty>
        <h2>Loading...</h2>
      </ProductsEmpty>
    )
  }
  if (products.length < 1) {
    return (
      <Container>
        <ProductsEmpty>
          <h2>Sorry, No Product matches your search</h2>
        </ProductsEmpty>
      </Container>
    )
  }

  return (
    <Container>
      {listView ? (
        <ProductsList>
          {products.map((p, index) => {
            return <ProductCard product={p} key={p.id} eager={index === 0} />
          })}
        </ProductsList>
      ) : (
        <ProductsGrid>
          {products.map((p, index) => {
            return <ProductCard product={p} key={p.id} eager={index === 0} />
          })}
        </ProductsGrid>
      )}
    </Container>
  )
}
const ProductsEmpty = styled.section`
  text-align: center;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProductsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1rem;
  /* padding: 3rem 0; */

  /* @media screen and (min-width: ${breakpoints.tablet}px) {
    grid-template-columns: repeat(3, 1fr);
  } */

  @media screen and (min-width: ${breakpoints.desktop}px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem 1.5rem;
  }
`
const ProductsList = styled.section`
  display: grid;
  gap: 1rem;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`
