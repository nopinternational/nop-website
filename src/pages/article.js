import React from 'react';
import { Link } from 'gatsby';

import Layout from '../componentsG/layout';
import SEO from '../componentsG/seo';

const ArticlePage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default ArticlePage;
