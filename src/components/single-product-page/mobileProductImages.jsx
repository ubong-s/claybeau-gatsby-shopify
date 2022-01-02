import React, { useState } from "react"
import styled from "styled-components"
import { breakpoints, theme } from "../../styles/globalStyle"
import { GatsbyImage } from "gatsby-plugin-image"

export default function MobileProductImages({ images, title }) {
  const [mainImage, setMainImage] = useState(0)
  return (
    <ProductImagesWrap
      role="group"
      aria-label="gallery"
      aria-describedby="instructions"
    >
      <ProductImage>
        <GatsbyImage
          // loading={index === 0 ? "eager" : "lazy"}
          alt={title}
          image={images[mainImage].gatsbyImageData}
        />
      </ProductImage>

      <ThumbnailImages>
        {images.map((image, index) => (
          /* eslint-disable  */
          <li
            key={`product-image-${image.id}`}
            onClick={() => setMainImage(index)}
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
      </ThumbnailImages>
    </ProductImagesWrap>
  )
}

const ProductImagesWrap = styled.div`
  display: grid;
  gap: 0.25rem;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: none;
  }
`

const ProductImage = styled.div`
  /* border-radius: ${theme.roundings.large}; */
  /* overflow: hidden; */

  .gatsby-image-wrapper {
    picture {
      object-fit: cover;
    }
  }
`

const ThumbnailImages = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;

  li {
    /* border-radius: ${theme.roundings.large};
    overflow: hidden; */
    cursor: pointer;
  }
`
