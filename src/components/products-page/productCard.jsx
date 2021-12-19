import React from "react"
import { formatPrice } from "../../utils/formatPrice"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { breakpoints, theme } from "../../styles/globalStyle"

export default function ProductCard({ product, eager }) {
  const { id, title, featuredImage, handle, vendor, priceRangeV2 } = product

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )

  console.log(handle)

  return (
    <ProductWrap
      to={`/products/${handle}`}
      aria-label={`View ${title} product page`}
    >
      <GatsbyImage
        image={featuredImage.gatsbyImageData}
        alt={title}
        className="gatsby-image"
      />
      <ProductInfo>
        <h2 className="title">{title}</h2>
        <div className="price">{price}</div>
      </ProductInfo>
    </ProductWrap>
  )
}

const ProductWrap = styled(Link)`
  color: ${theme.colors.secondary};
  background: ${theme.colors.white};
  border-radius: ${theme.roundings.large};
  box-shadow: ${theme.misc.shadow};
  overflow: hidden;

  .gatsby-image {
    position: relative;
    overflow: hidden;
    margin-bottom: 0.75rem;

    /* &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      );
    } */
  }
`
const ProductInfo = styled.div`
  padding: 1.5rem;

  .title {
    font-size: ${theme.sizes.medium};
    margin-bottom: 0.35rem;
  }

  .price {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.sizes.xlarge};
    font-weight: 600;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 0.75rem 1.5rem 1rem;

    .title {
      font-size: ${theme.headings.normal};
    }

    .price {
      font-size: ${theme.headings.large};
    }
  }
`

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    handle
    featuredImage {
      gatsbyImageData(
        layout: FULL_WIDTH
        placeholder: BLURRED
        width: 500
        height: 500
      )
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
  }
`
