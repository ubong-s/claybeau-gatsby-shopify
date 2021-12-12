import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Logo } from "../components"
import { menuLinks, footerLinks, socialLinks } from "../data/links"

export default function Footer() {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `)

  return (
    <FooterWrap>
      <FooterInner className="univ-container">
        <FooterTop>
          <Logo white="true" />

          <FooterLinks>
            <ul>
              {menuLinks.slice(1, 4).map((link, index) => {
                return (
                  <li key={index}>
                    <Link to={link.path}>{link.title}</Link>
                  </li>
                )
              })}
            </ul>
            <ul>
              {footerLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <Link to="#">{link.title}</Link>
                  </li>
                )
              })}
            </ul>
          </FooterLinks>
          <Social>
            {socialLinks.map((link, index) => {
              return (
                <li key={index}>
                  <Link to={link.path}>{link.icon}</Link>
                </li>
              )
            })}
          </Social>
        </FooterTop>
        <FooterBottom>
          <p>
            &copy; {data.site.siteMetadata.title} {new Date().getFullYear()}.
            All Rights Reserved.
          </p>
          <div className="line"></div>
          <p>
            Designed & developed by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.devubong.com/"
            >
              {" "}
              DevUbong
            </a>
          </p>
        </FooterBottom>
      </FooterInner>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  background-color: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.themeWhite};
  padding: 3rem 0;

  a {
    color: ${props => props.theme.themeWhite};
    transition: ${props => props.theme.transitionEase};

    &:hover {
      color: ${props => props.theme.primaryColor};
    }
  }

  @media screen and (min-width: 1024px) {
    padding: 4rem 0;
  }
`
const FooterInner = styled.div``

const FooterTop = styled.div`
  margin-bottom: 2rem;

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
`

const Social = styled.ul`
  display: flex;
  margin: 1rem 0;

  li {
    margin-right: 1rem;
  }

  @media screen and (min-width: 1024px) {
    justify-self: flex-end;
    margin-top: 0;

    li {
      margin-right: 0;
      margin-left: 2rem;
    }
  }
`

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1rem;

  li {
    margin: 0.75rem 0;
    font-size: 0.85rem;
  }

  @media screen and (min-width: 1024px) {
    margin: 0;

    li {
      margin-top: 0;
      margin-bottom: 0.75rem;
    }
  }
`

const FooterBottom = styled.div`
  font-size: 0.85rem;

  .line {
    height: 1px;
    background: ${props => props.theme.themeWhite};
    opacity: 0.2;
    margin: 1rem 0;
  }

  a {
    color: ${props => props.theme.primaryColor};
  }

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;

    .line {
      margin: 0 2rem;
    }
  }
`
