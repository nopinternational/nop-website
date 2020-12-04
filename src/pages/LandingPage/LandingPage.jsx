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
import ThreeBenefitsOfNoP from "./Sections/ThreeBenefitsOfNoP.jsx"

const dashboardRoutes = []

const LandingPage = (props) => {

  const data = useStaticQuery(
    graphql`
      query {
        contentfulPage(slug: { eq: "/" }) {
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
  )

  const { classes, ...rest } = props
  console.log(props)
  console.log("data", data)

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
                {data.contentfulPage.pagetitle}
              </h1>
              <h4>
                Every LANDING PAGE needs a small description after the big bold
                title, that's why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
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
          {renderArticles(data.contentfulPage.articles.slice(0, 1))}
          <ThreeBenefitsOfNoP />

          {renderArticles(data.contentfulPage.articles.slice(1))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(landingPageStyle)(LandingPage)
