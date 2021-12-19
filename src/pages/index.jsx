import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import {
  FeaturedProducts,
  Hero,
  Layout,
  Seo,
  Advantages,
  Testimonials,
} from "../components"

const IndexPage = ({ data: { products } }) => {
  return (
    <Layout>
      <Seo title="Home" />
      <Hero />
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
