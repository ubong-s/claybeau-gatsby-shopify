import React from "react"
import styled from "styled-components"
import { breakpoints, dimensions, theme } from "../../styles/globalStyle"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link as ScrollLink } from "react-scroll"

export default function DesktopProductImages({ images, title }) {
  return (
    <ProductImagesWrap
      role="group"
      aria-label="gallery"
      aria-describedby="instructions"
    >
      <ProductImages>
        {images.map((image, index) => (
          <li
            key={`product-image-${image.id}`}
            name={`product-image-${image.id}`}
          >
            <GatsbyImage
              objectFit="contain"
              loading={index === 0 ? "eager" : "lazy"}
              alt={
                image.altText
                  ? image.altText
                  : `Product Image of ${title} #${index + 1}`
              }
              image={image.gatsbyImageData}
            />
          </li>
        ))}
      </ProductImages>

      <ThumbnailImages>
        {images.map((image, index) => (
          <ScrollLink
            to={`product-image-${image.id}`}
            key={`product-image-${image.id}`}
            spy={true}
            smooth={true}
            offset={-150}
            duration={300}
          >
            <GatsbyImage
              objectFit="contain"
              loading={index === 0 ? "eager" : "lazy"}
              alt={
                image.altText
                  ? image.altText
                  : `Product Image of ${title} #${index + 1}`
              }
              image={image.gatsbyImageData}
            />
          </ScrollLink>
        ))}
      </ThumbnailImages>
    </ProductImagesWrap>
  )
}

const ProductImagesWrap = styled.div`
  display: none;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    gap: 2rem;
  }
`

const ProductImages = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 2rem;

  li {
    border-radius: ${theme.roundings.large};
    overflow: hidden;
  }
`
const ThumbnailImages = styled.div`
  position: sticky;
  top: calc(4rem + ${dimensions.headerHeight.desktop});
  bottom: 0;
  height: calc(100vh - ${dimensions.headerHeight.desktop});
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  a {
    border-radius: ${theme.roundings.large};
    overflow: hidden;
    cursor: pointer;
  }
`
