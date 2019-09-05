import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class AboutSpringPartyTeaser extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Om vårfesten </h2>
            <h5 className={classes.description}>
              Vad händer på våra fester? Läs den här berättelsen så vet ni ;) Vi hoppas att få uppleva något liknade på den kommande höstfesten!
      </h5>
            <Link to={"/om-varfesten"} className={classes.link}>
              <Button
                color="primary">
                Om Vårfesten
        </Button>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(AboutSpringPartyTeaser);
