import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// @material-ui/icons

// React icons
import { FaPlay } from "react-icons/fa"

// core components
import Article from "components/Article/Article.jsx"

import Header from "components/Header/Header.jsx"
import Footer from "components/Footer/Footer.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Button from "components/CustomButtons/Button.jsx"
import HeaderLinks from "components/Header/HeaderLinks.jsx"
import Parallax from "components/Parallax/Parallax.jsx"

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx"



import { useStaticQuery, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const dashboardRoutes = []

export const query = graphql`
    query($slug: String!) {
      contentfulPage(slug: {eq: $slug}) {
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
  

const Page = (props) => {
  

  

  const { classes, ...rest } = props
  const pageData = props.data.contentfulPage
  console.log(props)
  console.log("data", pageData)

  const renderArticles = (contentfulArticles) => {
    console.log(contentfulArticles)
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
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                {pageData.pagetitle}
              </h1>
              <h4>
                This is the templae PAGE
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPlay />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {renderArticles(pageData.articles)}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(landingPageStyle)(Page)
