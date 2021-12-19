import React from "react"
import styled from "styled-components"
import { breakpoints, dimensions } from "../../styles/globalStyle"

export default function Container({ children }) {
  return <ContainerWrap>{children}</ContainerWrap>
}

const ContainerWrap = styled.div`
  width: ${dimensions.containerWidth.mobile}%;
  margin: auto;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    width: ${dimensions.containerWidth.desktop}%;
  }
`
