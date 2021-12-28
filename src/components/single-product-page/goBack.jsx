import React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { breakpoints, theme } from "../../styles/globalStyle"

export default function GoBack() {
  return (
    <GoBackWrap>
      <Button type="button" onClick={() => navigate(-1)}>
        Back to Products
      </Button>
    </GoBackWrap>
  )
}

const GoBackWrap = styled.div`
  position: absolute;
  left: 1rem;
  top: 2rem;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    position: relative;
    left: unset;
    top: 0;
    right: 0;
    padding: 2rem 0 0;
    text-align: right;
    display: none;
  }
`

const Button = styled.button`
  padding: 0.75rem;
  border-radius: ${theme.roundings.large};
  outline: none;
  border: none;
  background: ${theme.colors.white};
  color: ${theme.colors.secondary};
  font-weight: ${theme.weights.semiBold};
  font-family: ${theme.fonts.secondary};
  opacity: 0.8;
  cursor: pointer;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 1rem;
    font-size: 1.1rem;
    opacity: 1;
  }
`
