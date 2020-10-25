const path = require('path');
console.log('creating pages... )');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const response = await graphql(`
    query {
      allContentfulPage(filter: { node_locale: { eq: "en-US" } }) {
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
            slug
            title
          }
        }
      }
    }
  `);

  response.data.allContentfulPage.edges.forEach((edge) => {
    console.log('create page for ' + edge.node.slug);
    createPage({
      path: `/${edge.node.slug}`,
      component: path.resolve('./src/templates/page.js'),
      context: {
        slug: edge.node.slug,
      },
    });
  });

  response.data.allContentfulArticle.edges.forEach((edge) => {
    console.log('create article-page for ' + edge.node.slug);
    createPage({
      path: `/article/${edge.node.slug}`,
      component: path.resolve('./src/templates/article.js'),
      context: {
        slug: edge.node.slug,
      },
    });
  });
};
