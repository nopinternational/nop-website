import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// core components
import Layout from "components/Layout/Layout.jsx"
import Article from "components/Article/Article.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Parallax from "components/Parallax/Parallax.jsx"

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
// Sections for this page

import { graphql } from "gatsby"

export const query = graphql`
  query($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      slug
      body {
        json
      }
      cta {
        id
        link
        text
      }
    }
  }
`

const ArticlePage = props => {
  const { classes } = props

  return (
    <Layout>
      <Parallax filter image={require("assets/img/zero.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                {props.data.contentfulArticle.title}
              </h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Article
            title={props.data.contentfulArticle.title}
            cta={props.data.contentfulArticle.cta}
          >
            {documentToReactComponents(props.data.contentfulArticle.body.json)}
          </Article>
        </div>
      </div>
    </Layout>
  )
}

export default withStyles(landingPageStyle)(ArticlePage)
