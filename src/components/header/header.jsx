import React from "react"
import styled from "styled-components"
import { Navigation, CartBtn, MenuBtn, Logo, Container } from ".."
import { useGlobalContext } from "../../context/globalContext"
import { dimensions, theme, breakpoints } from "../../styles/globalStyle"

export default function Header() {
  const { menuOpen } = useGlobalContext()

  return (
    <HeaderWrap className={menuOpen && "active"}>
      <Container>
        <HeaderInner>
          <Logo />
          <Navigation />
          <CartBtn />
          <MenuBtn />
        </HeaderInner>
      </Container>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${dimensions.headerHeight.mobile};
  transition: ${theme.misc.transitionEase};
  z-index: 101;
  border-bottom: solid 2px transparent;
  background: ${theme.colors.white};

  &.active {
    border-bottom: solid 2px ${theme.colors.primary};
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    height: ${dimensions.headerHeight.desktop};
    border: none;
  }
`

const HeaderInner = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    grid-template-columns: auto 1fr auto;
  }
`
