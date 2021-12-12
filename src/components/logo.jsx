import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

export default function Logo({ white }) {
  return (
    <LogoLink
      to="/"
      white="false"
      className={white === "true" ? "white-logo" : undefined}
    >
      Huskx
    </LogoLink>
  )
}

const LogoLink = styled(Link)`
  font-size: 1.25rem;
  color: ${props => props.theme.secondaryColor};

  &.white-logo {
    color: ${props => props.theme.themeWhite};
  }

  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`
