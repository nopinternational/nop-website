import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";


import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import AboutNoP from "./Sections/AboutNoP.jsx";
import SaveTheDate from "./Sections/SaveTheDate.jsx";
import BecomeAMember from "./Sections/BecomeAMember.jsx";
import ThreeBenefitsOfNoP from "./Sections/ThreeBenefitsOfNoP.jsx";
import WhosBehind from "./Sections/WhosBehind.jsx";
import AboutSpringPartyTeaser from "./Sections/AboutSpringPartyTeaser.jsx";
import FallPartyTeaser from "./Sections/FallPartyTeaser.jsx";



const dashboardRoutes = [];

class LandingPage extends React.Component {



  render() {
    const { classes, ...rest } = this.props;
    const emailLinkStyle = { color: "#FFFFFF" }

    const showMsg = false;
    const msg = () => showMsg? (
      <SnackbarContent
      message={
          <span>
            Vi har skickat ut mail till alla verifierade ang mingelträffen med bla information om 
            vilken bar vi ska vara på. Har ni inte fått mailet, hör av er till oss på <a style={emailLinkStyle} href="mailto:fest@nightofpassion.se">fest@nightofpassion.se</a>
          </span>
      }
      color="primary"
      icon="info"
    />
    ): null;

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Night of Passion"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/zero.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Night of Passion</h1>
                <h4>
                  Socialt. Passion. Sex.
                </h4>

              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {msg()}
            <AboutNoP />
            <ThreeBenefitsOfNoP />            
            <SaveTheDate sectionId="mingel"/>
            <FallPartyTeaser />
            <AboutSpringPartyTeaser />
            <BecomeAMember />
            <WhosBehind />

          {/*
            
            <TeamSection />
            <WorkSection />
            */}
          </div>
        </div>
        {/*
        <Footer />
        */}
      </div>
    );
  }
}
export default withStyles(landingPageStyle)(LandingPage);
