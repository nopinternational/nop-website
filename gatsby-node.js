const path = require('path');
console.log('creating pages... )');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const response = await graphql(`
    query {
      allContentfulArticle(filter: { slug: { ne: null } }) {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `);

  response.data.allContentfulArticle.edges.forEach((edge) => {
    console.log('create page for ' + edge.node.slug);
    createPage({
      path: `/article/${edge.node.slug}/`,
      component: path.resolve('./src/templates/article.js'),
      context: {
        slug: edge.node.slug,
      },
    });
  });
};
