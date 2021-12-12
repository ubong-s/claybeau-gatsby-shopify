import React from "react"
import { graphql } from "gatsby"
import { Layout, ProductListing, Seo } from "../../components"

export default function Products({ data: { products } }) {
  return (
    <Layout>
      <Seo title="All Products" />
      <ProductListing products={products.nodes} />
    </Layout>
  )
}

export const query = graphql`
  {
    products: allShopifyProduct(
      sort: { fields: publishedAt, order: ASC }
      limit: 9
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
