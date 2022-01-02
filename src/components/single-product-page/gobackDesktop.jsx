import React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { breakpoints, theme } from "../../styles/globalStyle"

export default function GoBackDesktop() {
  return (
    <GoBackWrap>
      <Button type="button" onClick={() => navigate(-1)}>
        {"<<"} Back to Products
      </Button>
    </GoBackWrap>
  )
}

const GoBackWrap = styled.div`
  display: none;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: block;
  }
`

const Button = styled.button`
  cursor: pointer;
  font-size: 0.9rem;
  padding: none;
  outline: none;
  border: none;
  color: ${theme.colors.primary};
  font-weight: ${theme.weights.semiBold};
  font-family: ${theme.fonts.secondary};
  transition: ${theme.misc.transitionEase};
  margin-bottom: 1rem;
  background: transparent;

  &:hover {
    color: ${theme.colors.secondary};
  }
`
