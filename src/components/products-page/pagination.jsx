import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Container } from ".."
import { breakpoints, theme } from "../../styles/globalStyle"

export default function Pagination({
  productPages,
  currentPage,
  isFirst,
  isLast,
  prevPage,
  nextPage,
  pageLink,
}) {
  const pages = []

  for (let i = 1; i < productPages + 1; i++) {
    pages.push(i)
  }

  return (
    <>
      {productPages > 1 && (
        <PaginationWrap>
          <Container>
            <PaginationInner>
              <li>
                {!isFirst && (
                  <Link to={`/${pageLink}/${prevPage}`} rel="prev">
                    ← Prev
                  </Link>
                )}
              </li>
              <PageNumbers>
                <ul>
                  {pages.map(p => {
                    return (
                      <li key={p}>
                        <Link
                          to={p === 1 ? `/products` : `/products/${p}`}
                          activeClassName="active"
                        >
                          {p}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </PageNumbers>
              <li>
                {!isLast && (
                  <Link to={`/${pageLink}/${nextPage}`} rel="next">
                    Next →
                  </Link>
                )}
              </li>
            </PaginationInner>
          </Container>
        </PaginationWrap>
      )}
    </>
  )
}

const PaginationWrap = styled.section`
  padding-top: 0;
  font-weight: ${theme.weights.bold};
`

const PaginationInner = styled.ul`
  display: flex;
  justify-content: space-between;
  background: ${theme.colors.white};
  padding: 1rem;
  border-radius: ${theme.roundings.large};

  a {
    color: ${theme.colors.secondary};
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 2rem;
    font-size: 1.25rem;
  }
`
const PageNumbers = styled.li`
  display: none;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: block;

    ul {
      display: flex;

      li {
        margin: 0 0.5rem;

        a {
          background: ${theme.colors.gray1};
          line-height: 0;
          padding: 0.5rem 0.75rem;
          border-radius: ${theme.roundings.medium};
          transition: ${theme.misc.transitionEase};

          &:hover {
            background: ${theme.colors.secondary};
            color: ${theme.colors.white};
          }
        }

        .active {
          background: ${theme.colors.secondary};
          color: ${theme.colors.white};
        }
      }
    }
  }
`
