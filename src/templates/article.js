import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../componentsG/layout';
import Img from 'gatsby-image';
import SEO from '../componentsG/seo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const query = graphql`
  query($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      slug
      body {
        json
      }
    }
  }
`;

const Article = (props) => {
  return (
    <Layout>
      <SEO title={props.data.contentfulArticle.title} />
      <Link to="/blog/">Visit the Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulArticle.title}</h1>
        <p>this is the content of {props.data.contentfulArticle.title}</p>
        <span className="meta">Posted on {props.data.contentfulArticle.publishedDate}</span>

        {documentToReactComponents(props.data.contentfulArticle.body.json)}
      </div>
    </Layout>
  );
};

export default Article;
