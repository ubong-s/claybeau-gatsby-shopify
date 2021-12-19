const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allShopifyProduct(
        sort: { fields: publishedAt, order: DESC }
        limit: 1000
      ) {
        nodes {
          id
          handle
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Product pages
  const products = result.data.allShopifyProduct.nodes
  const productsPerPage = 8
  const productPages = Math.ceil(products.length / productsPerPage)

  products.forEach((product, index) => {
    const previous = index === 0 ? null : blogs[index - 1]
    const next = index === blogs.length - 1 ? null : blogs[index + 1]

    createPage({
      path: `/products/${product.handle}`,
      component: path.resolve(`./src/templates/product.jsx`),
      context: {
        id: product.id,
        handle: product.handle,
        previous,
        next,
      },
    })
  })

  // Create Product Page
  Array.from({ length: productPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/products` : `/products/${i + 1}`,
      component: path.resolve(`./src/templates/products.jsx`),
      context: {
        limit: productsPerPage,
        skip: i * productsPerPage,
        productPages,
        currentPage: i + 1,
      },
    })
  })
}
