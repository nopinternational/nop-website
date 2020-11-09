const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const response = await graphql(`
    query {
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
  response.data.allContentfulArticle.edges.forEach(edge => {
    const pagepath = `/article/${edge.node.slug}`
    console.log(`creating page for ${pagepath}`)
    createPage({
      path: pagepath,
      component: path.resolve("./src/templates/article.jsx"),
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
