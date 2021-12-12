import React from "react"
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri"
import styled from "styled-components"
import { useGlobalContext } from "../context/globalContext"

export default function MenuBtn() {
  const { toggleMenu, menuOpen } = useGlobalContext()

  return (
    <MenuBtnWrap type="button" className="small-btn" onClick={toggleMenu}>
      {menuOpen ? <RiCloseFill /> : <RiMenu3Fill />}
    </MenuBtnWrap>
  )
}

const MenuBtnWrap = styled.button`
  @media screen and (min-width: 1024px) {
    display: none;
  }
`
