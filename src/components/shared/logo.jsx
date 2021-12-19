import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { theme, breakpoints } from "../../styles/globalStyle"

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
  font-size: ${theme.sizes.medium};
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.weights.semiBold};
  color: ${theme.colors.secondary};

  &.white-logo {
    color: ${theme.colors.white};
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    font-size: ${theme.sizes.xlarge};
  }
`
