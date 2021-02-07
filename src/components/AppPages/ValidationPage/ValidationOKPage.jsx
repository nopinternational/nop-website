import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// @material-ui/icons

// core components
import Layout from "../../Layout/Layout.jsx"
import Article from "../../Article/Article.jsx"

import GridContainer from "../../Grid/GridContainer.jsx"
import GridItem from "../../Grid/GridItem.jsx"
import Parallax from "../../Parallax/Parallax.jsx"

import landingPageStyle from "../../../assets/jss/material-kit-react/views/landingPage.jsx"

// Sections for this page
import ValidationForm from "./ValidationForm.jsx"
import Logout from "./Logout.jsx"

const ValidationPage = props => {
  console.log("ValidationPage: ", props)
  const { classes } = props

  return (
    <Layout>
      <Parallax filter image={require("assets/img/zero.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Night of Passion</h1>
              <h4>Socialt. Passion. Sex.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Article title="Validering">
            <p>
              Nätverket Night of Passion är en exklusiv medlemsklubb. Vi tar
              emot par som medlemmar som är seriösa och som delar nätverkets
              värderingar.
            </p>
            <p className={classes.description}>
              Nedan kan ni ansöka om att bli medlemmar. Efter att ni har ansökt
              om medlemskap kommer vi att kontakta er.
            </p>
            <ValidationForm />
            <Logout></Logout>
          </Article>
        </div>
      </div>
    </Layout>
  )
}

export default withStyles(landingPageStyle)(ValidationPage)
