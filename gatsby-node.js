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
        collections: distinct(field: productType)
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
    const previous = index === 0 ? null : products[index - 1]
    const next = index === products.length - 1 ? null : products[index + 1]

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

  // collections
  const collections = result.data.allShopifyProduct.collections
  collections.forEach((collection, index) => {
    // craete custom slug for collections
    let tempCollection = collection.toLowerCase().split("")
    let slug = []
    for (let i = 0; i < tempCollection.length; i++) {
      if (tempCollection[i] === " ") {
        tempCollection[i] = "-"
      }
      if (tempCollection[i] === "&") {
        tempCollection[i] = "and"
      }
      slug.push(tempCollection[i])
    }
    slug = slug.join("")
    createPage({
      path: `/products/${slug}`,
      component: path.resolve(`./src/templates/collections.jsx`),
      context: {
        collection,
      },
    })
  })

  // Create Product Page
  // Array.from({ length: productPages }).forEach((_, i) => {
  //   createPage({
  //     path: i === 0 ? `/products` : `/products/${i + 1}`,
  //     component: path.resolve(`./src/templates/products.jsx`),
  //     context: {
  //       limit: productsPerPage,
  //       skip: i * productsPerPage,
  //       productPages,
  //       currentPage: i + 1,
  //     },
  //   })
  // })
}
