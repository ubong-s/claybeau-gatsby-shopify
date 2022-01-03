import React from "react"
import { graphql } from "gatsby"
import { Layout, ProductListing } from "../components"

export default function Collections({ data: { products }, pageContext }) {
  return (
    <Layout>
      <ProductListing products={products.nodes} />
    </Layout>
  )
}

export const query = graphql`
  query ($collection: String) {
    products: allShopifyProduct(filter: { productType: { eq: $collection } }) {
      nodes {
        ...ProductCard
      }
    }
  }
`
