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
            <h2 className={classes.title}>After-Work-mingel - Fredag 24 Januari</h2>
            <h5 className={classes.description}>
              Vi ordnar en mingelträff i form av en After Work i Stockholm city där ni kan mingla tillsammans med andra sociala sexiga par.
              Under kvällen så kommer ni få träffa andra par som är öppna för fester eller träffar tillsammans med andra par.
            Se det som en kemiträff de luxe!</h5>

            <h5 className={classes.description}>
              För mer info om träffen klicka nedan.
            </h5>
            <Link to={"/mingel"} className={classes.link}>
              <Button
                color="primary">
                Mingelträff
              </Button>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(SaveTheDate);
