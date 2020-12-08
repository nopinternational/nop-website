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

// Sections for this page
import BecomeAMemberForm from "./Sections/BecomeAMemberForm.jsx"

const dashboardRoutes = []

const SignupPage = props => {
  const { classes, ...rest } = props

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
              <h1 className={classes.title}>Night of Passion</h1>
              <h4>Socialt. Passion. Sex.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Article title="Bli medlem">
            <p>
              Nätverket Night of Passion är en exklusiv medlemsklubb. Vi tar
              emot par som medlemmar som är seriösa och som delar nätverkets
              värderingar.
            </p>
            <p className={classes.description}>
              Nedan kan ni ansöka om att bli medlemmar. Efter att ni har ansökt
              om medlemskap kommer vi att kontakta er.
            </p>
            <BecomeAMemberForm />
          </Article>
        </div>
      </div>
    </div>
  )
}

export default withStyles(landingPageStyle)(SignupPage)
