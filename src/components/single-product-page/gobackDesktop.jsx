import React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { breakpoints, theme } from "../../styles/globalStyle"

export default function GoBackDesktop() {
  return (
    <GoBackWrap>
      <Button type="button" onClick={() => navigate(-1)}>
        Back to Products
      </Button>
    </GoBackWrap>
  )
}

const GoBackWrap = styled.div`
  display: none;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
`

const Button = styled.button`
  padding: 1rem;
  border-radius: ${theme.roundings.large};
  outline: none;
  border: none;
  background: ${theme.colors.white};
  color: ${theme.colors.secondary};
  font-weight: ${theme.weights.semiBold};
  font-family: ${theme.fonts.secondary};
  font-size: 1.1rem;
  cursor: pointer;
`
