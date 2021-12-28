import React from "react"
import styled from "styled-components"
import { Container, SearchForm, FilterForm } from ".."

export default function Filters() {
  return (
    <FiltersWrap>
      <Container>
        <SearchForm />
        <FilterForm />
      </Container>
    </FiltersWrap>
  )
}

const FiltersWrap = styled.section`
  padding: 2rem 0 0;
`
