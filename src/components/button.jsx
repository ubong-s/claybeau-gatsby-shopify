import React from "react"
import styled from "styled-components"

export default function Button({ title, ButtonType }) {
  return <ButtonWrap type="button">{title}</ButtonWrap>
}

const ButtonWrap = styled.button`
  padding: 1rem 2rem;
`
