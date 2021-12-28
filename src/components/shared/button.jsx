import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { breakpoints, theme } from "../../styles/globalStyle"

export default function Button({
  title,
  buttonType,
  url,
  buttonColor = `${theme.colors.secondary}`,
}) {
  return (
    <ButtonWrap type="button" buttonColor={buttonColor} buttonType={buttonType}>
      {url ? <Link to={url}>{title}</Link> : title}
    </ButtonWrap>
  )
}

const ButtonWrap = styled.button`
  cursor: pointer;
  padding: 0.6rem 1.2rem;
  font-size: ${theme.sizes.small};
  font-family: ${theme.fonts.secondary};
  font-weight: ${theme.weights.semiBold};
  outline: none;
  background-color: ${({ buttonType, buttonColor }) =>
    buttonType === "outline" ? "transparent" : buttonColor};
  border: ${({ buttonColor }) =>
    buttonColor ? `${buttonColor} 2px solid` : null};
  border-radius: ${theme.roundings.large};
  transition: ${theme.misc.transitionEase};
  text-transform: capitalize;
  letter-spacing: 1.5px;
  color: ${({ buttonType, buttonColor }) =>
    buttonType === "outline" ? buttonColor : `${theme.colors.white}`};

  a {
    color: ${({ buttonType, buttonColor }) =>
      buttonType === "outline" ? buttonColor : `${theme.colors.white}`};
  }

  &:hover {
    opacity: 0.9;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 0.8rem 1.25rem;
    font-size: ${theme.sizes.medium};
  } ;
`
