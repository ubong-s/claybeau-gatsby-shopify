import React from "react"
import styled from "styled-components"
import { Navigation, CartBtn, MenuBtn, Logo } from "."
import { useGlobalContext } from "../context/globalContext"

export default function Header() {
  const { menuOpen } = useGlobalContext()

  return (
    <HeaderWrap className={menuOpen && "active"}>
      <HeaderInner className="univ-container">
        <Logo />
        <Navigation />
        <CartBtn />
        <MenuBtn />
      </HeaderInner>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  transition: ${props => props.theme.transitionEase};
  z-index: 101;
  border-bottom: solid 2px transparent;

  &.active {
    border-bottom: solid 2px ${props => props.theme.primaryColor};
  }

  @media screen and (min-width: 1024px) {
    height: 100px;
  }
`

const HeaderInner = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;

  @media screen and (min-width: 1024px) {
    grid-template-columns: auto 1fr auto;
  }
`
