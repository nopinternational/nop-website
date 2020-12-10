const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const response = await graphql(`
    query {
      allContentfulPage {
        edges {
          node {
            name
            slug
          }
        }
      }
      allContentfulArticle(filter: { slug: { ne: null } }) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `)

  response.data.allContentfulPage.edges.forEach(edge => {
    const pagepath = `/${edge.node.slug}`
    console.log(`creating page for ${pagepath}`)
    createPage({
      path: pagepath,
      component: path.resolve("./src/templates/PageTemplate.jsx"),
      context: {
        slug: edge.node.slug,
      },
    })
  })

  response.data.allContentfulArticle.edges.forEach(edge => {
    const pagepath = `/article/${edge.node.slug}`
    console.log(`creating page for ${pagepath}`)
    createPage({
      path: pagepath,
      component: path.resolve("./src/templates/ArticlePageTemplate.jsx"),
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
