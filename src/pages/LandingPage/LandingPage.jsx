import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// @material-ui/icons

// core components
import Article from "components/Article/Article.jsx"

import Header from "components/Header/Header.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
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


  const renderArticles = (contentfulArticles) => {

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
        //rightLinks={<HeaderLinks />}
        brand="Night of Passion"
        fixed
        changeColorOnScroll={{
          height: 80,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/zero.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>
                {data.contentfulPage.pagetitle}
              </h1>
              <h4>
                Socialt. Passion. Sex.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Article title="Vad är Night of Passion?" >
            <p>Vi är det nya nätverket där passion, sensualitet och sex står i centrum. Hos oss träffar du likasinnade män, kvinnor och par. Genom att införa modern teknik kan vi skapa tillfällen för alla där vi nästan kan garantera succé. Det vi kan erbjuda är en mötesplats och bra funktioner som gör att du kan arrangera träffar eller träffa andra där fokus kommer att vara på hög tillfredställelse. Vi vill ge er möjlighet att njuta mer tillsammans med varandra och mindre trassel med festfixandet och krånglet med att få med rätt personer.</p>
          </Article>
          <ThreeBenefitsOfNoP />
          {renderArticles(data.contentfulPage.articles.slice(0, 1))}
          {renderArticles(data.contentfulPage.articles.slice(1))}
        </div>
      </div>
    </div>
  )
}

export default withStyles(landingPageStyle)(LandingPage)
