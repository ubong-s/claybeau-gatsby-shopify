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
import { breakpoints } from "../styles/globalStyle"

export default function Product({ data: { product } }) {
  const {
    title,
    description,
    images: [firstImage],
    priceRangeV2,
    variants,
    variants: [initialVariant],
  } = product

  const { client } = useStoreContext()

  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailablity = React.useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        const result =
          fetchedProduct?.variants.filter(
            variant => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const selectOption = (index, event) => {
    const value = event.target.dataset.value

    if (value === "") {
      return
    }

    const currentOptions = [...variant.selectedOptions]

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = variants.find(variant => {
      return isEqual(currentOptions, variant.selectedOptions)
    })

    setVariant({ ...selectedVariant })
  }

  useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1

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
            <ProductDetails
              {...product}
              price={price}
              hasVariants={hasVariants}
              variant={variant}
              selectOption={selectOption}
              quantity={quantity}
              setQuantity={setQuantity}
              variantId={productVariant.storefrontId}
              available={available}
            />
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
        inventoryQuantity
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
