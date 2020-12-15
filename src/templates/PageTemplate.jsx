import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// @material-ui/icons

// core components
import Article from "components/Article/Article.jsx"
import Layout from "components/Layout/Layout.jsx"

import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Parallax from "components/Parallax/Parallax.jsx"

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx"

import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      name
      pagetitle
      slug
      articles {
        title
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
  }
`

const Page = props => {
  const { classes, ...rest } = props
  const pageData = props.data.contentfulPage

  const renderArticles = contentfulArticles => {
    return (
      <div>
        {contentfulArticles.map((article, index) => {
          return (
            <Article title={article.title} cta={article.cta} key={index}>
              {documentToReactComponents(article.body.json)}
            </Article>
          )
        })}
      </div>
    )
  }

  return (
    <Layout>
      <Parallax filter image={require("assets/img/zero.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>{pageData.pagetitle}</h1>
              <h4>Socialt. Passion. Sex.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {renderArticles(pageData.articles)}
        </div>
      </div>
    </Layout>
  )
}

export default withStyles(landingPageStyle)(Page)
