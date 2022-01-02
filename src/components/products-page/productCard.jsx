import React from "react"
import { formatPrice } from "../../utils/formatPrice"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { breakpoints, theme } from "../../styles/globalStyle"
import { useFilterContext } from "../../context/filterContext"

export default function ProductCard({ product, eager, hideDesc, normalSize }) {
  const { listView } = useFilterContext()
  const { title, description, featuredImage, handle, priceRangeV2 } = product

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )

  return (
    <ProductWrap
      to={`/products/${handle}`}
      aria-label={`View ${title} product page`}
      className={listView && "list-view"}
    >
      <GatsbyImage
        image={featuredImage.gatsbyImageData}
        alt={title}
        className="gatsby-image"
      />
      <ProductInfo className={listView && "list-view"}>
        <h2 className={normalSize ? "title normal" : "title"}>{title}</h2>
        {(!hideDesc || listView) && (
          <p className="description">{description.substring(0, 100)}...</p>
        )}
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
  transition: ${theme.misc.transitionEase};

  .gatsby-image {
    position: relative;
    overflow: hidden;
    object-fit: cover;
    line-height: 0;
  }

  &.list-view {
    display: grid;
    grid-template-columns: 1fr 2fr;

    .gatsby-image {
    }
  }

  &:hover {
    background: ${theme.colors.gray1};
    box-shadow: none;

    /* & > * {
      color: ${theme.colors.white};
    } */
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    &.list-view {
      grid-template-columns: 1fr 2fr;
      gap: 0.5rem;
    }
  }
`
const ProductInfo = styled.div`
  padding: 1.5rem;

  .title {
    font-size: ${theme.sizes.medium};
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .description {
    display: none;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: ${theme.colors.gray6};
  }

  .price {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.sizes.xlarge};
    color: ${theme.colors.secondary};
    font-weight: 600;
  }

  &.list-view {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .description {
      display: block;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 1.25rem 1.5rem;

    .title {
      font-size: ${theme.headings.large};

      &.normal {
        font-size: ${theme.headings.normal};
      }
    }

    .description {
      display: block;
      font-size: 1rem;
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
    description
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
