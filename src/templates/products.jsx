import React from "react"
import { graphql } from "gatsby"
import { Filters, Layout, Pagination, ProductListing, Seo } from "../components"

export default function Products({
  data: { products },
  pageContext: { productPages, currentPage },
}) {
  const isFirst = currentPage === 1
  const isLast = currentPage === productPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <Seo title="All Products" />
      <Filters />
      <ProductListing products={products.nodes} />
      <Pagination
        productPages={productPages}
        currentPage={currentPage}
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
        pageLink="products"
      />
    </Layout>
  )
}

export const query = graphql`
  query productsQuery($skip: Int, $limit: Int) {
    products: allShopifyProduct(
      sort: { fields: publishedAt, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        pageCount
      }
    }
  }
`
