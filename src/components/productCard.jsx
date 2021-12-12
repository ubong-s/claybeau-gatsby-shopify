import React from "react"
import { formatPrice } from "../utils/formatPrice"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

export default function ProductCard({ product, eager }) {
  const { id, title, featuredImage, handle, vendor, priceRangeV2 } = product

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )

  const slug = `/products/${handle}`

  return (
    <ProductWrap to={slug} aria-label={`View ${title} product page`}>
      <GatsbyImage
        image={featuredImage.gatsbyImageData}
        alt={title}
        className="gatsby-image"
      />
      <h2 className="title">{title}</h2>
      <div className="price">{price}</div>
    </ProductWrap>
  )
}

const ProductWrap = styled(Link)`
  color: ${props => props.theme.secondaryColor};

  .gatsby-image {
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 0.75rem;
    box-shadow: ${props => props.theme.shadow};
  }

  .title {
    font-size: 0.8rem;
    font-weight: 400;
  }

  .price {
    font-weight: 600;
  }

  @media screen and (min-width: 768px) {
    .title {
      font-size: 0.9rem;
    }

    .price {
      font-size: 1.25rem;
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
