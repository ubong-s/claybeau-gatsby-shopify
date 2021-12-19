import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Logo, Container } from "../../components"
import { menuLinks, footerLinks, socialLinks } from "../../data/links"
import { breakpoints, dimensions, theme } from "../../styles/globalStyle"

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
      <FooterTop>
        <Container>
          <div className="content-top">
            <div>
              <Logo />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam, fuga eligendi tempora aspernatur voluptas ullam laborum
                molestiae facere optio iure.
              </p>
            </div>
            <FooterLinks>
              <div>
                <h3 className="title">Hot Links</h3>
                <ul>
                  {menuLinks.map((link, index) => {
                    return (
                      <li key={index}>
                        <Link to={link.path}>{link.title}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <h3 className="title">More Info</h3>
                <ul>
                  {footerLinks.map((link, index) => {
                    return (
                      <li key={index}>
                        <Link to="#">{link.title}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </FooterLinks>
            <Social>
              <h3 className="title">Social</h3>
              <div className="content-social">
                {socialLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      <a href={link.path} target="_blank" rel="noreferrer">
                        {link.icon}
                      </a>
                    </li>
                  )
                })}
              </div>
            </Social>
          </div>
        </Container>
      </FooterTop>
      <FooterBottom>
        <Container>
          <div className="content-bottom">
            <p>
              &copy; {data.site.siteMetadata.title} {new Date().getFullYear()}.
              All Rights Reserved.
            </p>
            <p>
              Developed by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.devubong.com/"
              >
                {" "}
                DevUbong
              </a>
            </p>
          </div>
        </Container>
      </FooterBottom>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  @media screen and (min-width: ${breakpoints.desktop}px) {
    .title {
      font-size: ${theme.sizes.xlarge};
    }
  }
`

const FooterTop = styled.div`
  background: ${theme.colors.white};
  padding: 2rem 0;

  p {
    margin-top: 1rem;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 3rem 0;

    .content-top {
      display: grid;
      grid-template-columns: 2fr 3fr 1fr;
      gap: 3rem;
    }
  }
`

const Social = styled.ul`
  .content-social {
    display: flex;

    li {
      margin-right: 1.5rem;

      a {
        color: ${theme.colors.secondary};

        &:hover {
          color: ${theme.colors.gray6};
          transition: ${theme.misc.transitionEase};
        }
      }
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    .content-social {
      li {
        a {
          font-size: ${theme.sizes.large};
        }
      }
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

    a {
      color: ${theme.colors.gray6};
      transition: ${theme.misc.transitionEase};

      &:hover {
        color: ${theme.colors.secondary};
      }
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    margin: 0;

    li {
      font-size: 1rem;
      margin-top: 0;
      margin-bottom: 1rem;
    }
  }
`
const FooterBottom = styled.div`
  background: ${theme.colors.gray1};
  font-size: 0.85rem;

  a {
    color: ${theme.colors.gray4};
    transition: ${theme.misc.transitionEase};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  .content-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${dimensions.headerHeight.mobile};

    p {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    font-size: 1rem;

    .content-bottom {
      height: ${dimensions.headerHeight.desktop};
    }
  }
`
