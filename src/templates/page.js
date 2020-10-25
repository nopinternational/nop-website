import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../componentsG/layout';
import Img from 'gatsby-image';
import SEO from '../componentsG/seo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      name
    }
  }
`;

const Article = (props) => {
  return (
    <Layout>
      <Link to="/blog/">Visit the Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulPage.name}</h1>
        <p>this is the page of {props.data.contentfulPage.name}</p>
      </div>
    </Layout>
  );
};

export default Article;
