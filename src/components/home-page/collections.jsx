import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Container } from ".."
import { collecttionLinks } from "../../data/links"
import { theme, breakpoints } from "../../styles/globalStyle"

export default function Collections() {
  return (
    <CollectionsWrap>
      <Container>
        <CollectionsInner>
          {collecttionLinks.map((collection, index) => {
            return (
              <Link className="card" to={collection.path}>
                <img src={collection.image} alt={collection.title} />
                <h3>{collection.title}</h3>
              </Link>
            )
          })}
        </CollectionsInner>
      </Container>
    </CollectionsWrap>
  )
}

const CollectionsWrap = styled.section``
const CollectionsInner = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 250px 125px 125px;
  gap: 1rem;

  .card {
    position: relative;
    background-color: ${theme.colors.primary};
    border-radius: ${theme.roundings.large};
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding: 1rem;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      );
    }

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    h3 {
      position: relative;
      z-index: 3;
      line-height: 0;
      color: ${theme.colors.white};
    }

    &:nth-of-type(1) {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }

    &:nth-of-type(2) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    &:nth-of-type(3) {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    &:nth-of-type(4) {
      grid-column: 1 / 3;
      grid-row: 3 / 4;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 200px 200px;
    gap: 1.5rem;

    .card {
      background-color: ${theme.colors.primary};
      border-radius: ${theme.roundings.large};
      padding: 1.75rem;

      h3 {
        font-size: ${theme.headings.large};
      }

      &:nth-of-type(1) {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        padding: 2.5rem;

        h3 {
          font-size: ${theme.headings.xxlarge};
        }
      }

      &:nth-of-type(2) {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
      }

      &:nth-of-type(3) {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
      }

      &:nth-of-type(4) {
        grid-column: 2 / 4;
        grid-row: 2 / 3;
      }
    }
  }
`
