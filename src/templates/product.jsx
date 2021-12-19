import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { getSrc } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import {
  Layout,
  Seo,
  Container,
  DesktopProductImages,
  ProductDetails,
  MobileProductImages,
  GoBack,
} from "../components"
import isEqual from "lodash.isequal"
import { useStoreContext } from "../context/storeContext"
import { formatPrice } from "../utils/formatPrice"
import { breakpoints, dimensions, theme } from "../styles/globalStyle"

export default function Product({
  data: { product, suggestions },
  pageContext,
}) {
  const {
    title,
    description,
    images,
    images: [firstImage],
    productType,
    priceRangeV2,
    variants,
    variants: [initialVariant],
    price,
    options,
  } = product

  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)

  const hasImages = images.length > 0
  const hasVariants = variants.length > 1
  const hasMultipleImages = true || images.length > 1

  return (
    <Layout>
      <Seo
        title={title}
        description={description}
        image={getSrc(firstImage.gatsbyImageData)}
      />
      <SingleProductWrap>
        <MobileProductImages {...product} /> {/* Mobile Images */}
        <Container>
          <GoBack />
          <SingleProductInner>
            <ProductDetails {...product} />
            <DesktopProductImages {...product} /> {/* Desktop Images */}
          </SingleProductInner>
        </Container>
      </SingleProductWrap>
    </Layout>
  )
}

const SingleProductWrap = styled.div`
  position: relative;
`

const SingleProductInner = styled.section`
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  overflow: visible;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 3rem;
    overflow: unset;
  }
`

export const query = graphql`
  query ($id: String, $productType: String) {
    product: shopifyProduct(id: { eq: $id }) {
      id
      title
      description
      productType
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: FULL_WIDTH, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
