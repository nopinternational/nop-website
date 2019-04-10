import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class SaveTheDate extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Save the date - Fredag 17 Maj</h2>
          <h5 className={classes.description}>
          Snart släpper vi mer information om vad som händer 17/5...</h5>
          <h5 className={classes.description}>
          Gå med i Night of Passion så missar ni inte när vi publicerar vad som händer.</h5>
        </GridItem>
      </GridContainer>
    </div>
    );
  }
}

export default withStyles(productStyle)(SaveTheDate);
