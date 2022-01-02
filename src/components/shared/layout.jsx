import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Header, Footer, Cart } from ".."
import {
  GlobalStyle,
  theme,
  ThemeContext,
  breakpoints,
} from "../../styles/globalStyle"
import styled from "styled-components"
import { useGlobalContext } from "../../context/globalContext"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { cartOpen, closeCart, menuOpen } = useGlobalContext()

  return (
    <LayoutWrap className={(cartOpen && "opened") || (menuOpen && "opened")}>
      <ThemeContext>
        <GlobalStyle />
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <PageContent className={cartOpen && "opened"} onClick={closeCart}>
          {children}
        </PageContent>
        <Footer />
        <Cart />
      </ThemeContext>
    </LayoutWrap>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const LayoutWrap = styled.div`
  &.opened {
    // height: 100vh;
    // overflow: scroll;
  }
`

const PageContent = styled.main`
  transition: ${theme.misc.transitionEase};
  transform: translateX(0);
  position: relative;

  &::after {
    transform: translateX(100%);
    opacity: 0;
  }

  &.opened {
    transform: translateX(-100%);
    transition: ${theme.misc.transitionEase};
    filter: blur(1.5px);

    &::after {
      position: absolute;
      content: "";
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    &.opened {
      transform: translateX(-400px);
    }
  }
`
