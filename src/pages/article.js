import React from 'react';
import { Link, useStaticQuery } from 'gatsby';

import Layout from '../componentsG/layout';
import SEO from '../componentsG/seo';

const ArticlePage = () => {
  const data = useStaticQuery(
    graphql`
      query MyQuery {
        allContentfulArticle(filter: { slug: { ne: null } }) {
          edges {
            node {
              id
              slug
              title
            }
          }
        }
      }
    `
  );
  return (
    <Layout>
      <SEO title="Page two" />
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
      <ul className="posts">
        {data.allContentfulArticle.edges.map((edge) => {
          return (
            <li key={edge.node.id}>
              <h2>
                <Link to={`/article/${edge.node.slug}/`}>{edge.node.title}</Link>
              </h2>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default ArticlePage;
