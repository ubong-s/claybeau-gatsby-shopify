import React from "react"
import { graphql } from "gatsby"
import { Filters, Layout, Pagination, ProductListing, Seo } from "../components"
import { useFilterContext } from "../context/filterContext"

export default function Products() {
  const { filteredProducts } = useFilterContext()

  return (
    <Layout>
      <Seo title="All Products" />
      <Filters />
      <ProductListing products={filteredProducts} />
      {/* <Pagination
        productPages={productPages}
        currentPage={currentPage}
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
        pageLink="products"
      /> */}
    </Layout>
  )
}
