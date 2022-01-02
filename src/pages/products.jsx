import React from "react"
import { Filters, Layout, ProductListing, Seo } from "../components"
import { useFilterContext } from "../context/filterContext"

export default function Products() {
  const { filteredProducts } = useFilterContext()

  return (
    <Layout>
      <Seo title="All Products" />
      <Filters />
      <ProductListing products={filteredProducts} />
    </Layout>
  )
}
