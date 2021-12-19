import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { menuLinks } from "../../data/links"
import { useGlobalContext } from "../../context/globalContext"
import { theme } from "../../styles/globalStyle"

export default function Navigation() {
  const { menuOpen } = useGlobalContext()

  return (
    <NavWrap menuOpen={menuOpen}>
      {menuLinks.map((link, index) => (
        <Link to={link.path} key={index} activeClassName="active">
          {link.title}
        </Link>
      ))}
    </NavWrap>
  )
}

const NavWrap = styled.nav`
  position: fixed;
  top: 75px;
  left: 1rem;
  right: 1rem;
  /* bottom: 0; */
  /* width: 100%; */
  background: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
  z-index: 100;
  transition: ${theme.misc.transitionEase};
  transform: ${({ menuOpen }) =>
    menuOpen ? `translateY(0)` : `translateX(100vw)`};
  box-shadow: ${theme.misc.shadow};
  border-bottom-left-radius: ${theme.roundings.medium};
  border-bottom-right-radius: ${theme.roundings.medium};

  a {
    position: relative;
    padding-left: 1rem;
    margin: 1rem 0;
    color: ${theme.colors.secondary};
    font-size: 1.25rem;
    font-family: ${theme.fonts.primary};
  }

  .active {
    opacity: 0.5;

    &::after {
      opacity: 1;
    }
  }

  @media screen and (min-width: 1024px) {
    position: relative;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;
    width: unset;
    background: unset;
    border-top: none;
    display: flex;
    flex-direction: unset;
    align-items: unset;
    padding: unset;
    justify-content: center;
    transform: translateX(0);
    box-shadow: unset;
    border-radius: 0;

    a {
      padding: 0 2.5rem;
      margin: 0;
    }
  }
`
