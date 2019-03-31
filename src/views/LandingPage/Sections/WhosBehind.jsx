import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class AboutNoP extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Vilka är vi bakom Night of Passion?</h2>
            <h5 className={classes.description}>
              Vi är några par som har tröttnat på att använda traditionella sätt att träffa andra par. Det traditionella sättet kännetecknas av osäkerhet och oseriöst. Vi har alla gått på träff där vi fått sitta själva för att dom andra inte kommer, blivit förvånad över att bilderna eller beskrivning inte stämmer eller gått på en fest som redan från början inte har kännts rätt.
            </h5>
            <h5 className={classes.description}>
              Vi vill förändra det!
            </h5>
          </GridItem>
        </GridContainer>
        {/*
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Free Chat"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={Chat}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Verified Users"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Fingerprint"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon={Fingerprint}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
        */}
      </div>
    );
  }
}

export default withStyles(productStyle)(AboutNoP);
