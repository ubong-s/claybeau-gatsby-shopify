import React from "react"
import { graphql } from "gatsby"
import {
  FeaturedProducts,
  Hero,
  Layout,
  Seo,
  Advantages,
  Testimonials,
  Collections,
} from "../components"

const IndexPage = ({ data: { products } }) => {
  return (
    <Layout>
      <Seo title="Home" />
      <Hero />
      <Collections />
      <Advantages />
      <FeaturedProducts products={products.nodes} />
      <Testimonials />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    products: allShopifyProduct(
      sort: { fields: publishedAt, order: DESC }
      limit: 4
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`
