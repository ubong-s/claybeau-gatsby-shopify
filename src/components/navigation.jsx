import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { menuLinks } from "../data/links"
import { useGlobalContext } from "../context/globalContext"

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
  left: 0;
  bottom: 0;
  width: 70%;
  background: ${props => props.theme.themeWhite};
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  z-index: 100;
  transition: ${props => props.theme.transitionEase};
  transform: ${({ menuOpen }) =>
    menuOpen ? `translateX(0)` : `translateX(-100%)`};

  a {
    position: relative;
    padding-left: 1rem;
    margin: 1rem 0;
    color: ${props => props.theme.secondaryColor};
    font-size: 1.25rem;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      border-left: 2px solid ${props => props.theme.secondaryColor};
      transform: skew(170deg);
    }
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
    bottom: unset;
    width: unset;
    background: unset;
    border-top: none;
    display: flex;
    flex-direction: unset;
    padding: unset;
    justify-content: center;
    transform: translatex(0);

    a {
      padding: 0 2.5rem;
      margin: 0;

      &::after {
        border-left: 1.5px solid ${props => props.theme.secondaryColor};
      }

      &:nth-of-type(1) {
        &::after {
          border-left: none;
        }
      }
    }
  }
`
