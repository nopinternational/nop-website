import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../componentsG/layout';
import SEO from '../componentsG/seo';
import { database } from 'firebase';

export const query = graphql`
  query {
    contentfulPage(slug: { eq: "/" }) {
      name
    }
  }
`;

const IndexPage = (props) => (
  <Layout>
    <SEO title="Home" />
    <p>HEllo INDEX</p>
    <p>This is the index page with name {props.data.contentfulPage.name}</p>
    <Link to="/blog/">Visit the Blog Page</Link>
  </Layout>
);

export default IndexPage;
