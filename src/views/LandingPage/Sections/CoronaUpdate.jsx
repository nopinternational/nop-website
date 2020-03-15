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
            <h2 className={classes.title}>Vi pausar våra träffar pga Coronaviruset</h2>
            <h5 className={classes.description}>
            Hela Sverige och världen är påverkade av spridningen av Coronaviruset, vilket såklart även gäller oss. 
            Fram tills att det allmänna läget kring situationen lugnat ned sig så kommer vi att pausa våra aktiviteter. 
            I nuläget så känns det inte helt rätt att arrangera träffar när regeringen och vetenskapen istället förordar att vi ska undvika allmänna sammankomster.</h5>
            <h5 className={classes.description}>
            Så snart vi känner att det är läge för det så kommer vi naturligtvis igång med vår versamhet igen!
            Hoppas att ni har förståelse för detta och vi hoppas att vi får chansen att ses snart efter att Corona-stormen har blåst över.
            </h5>
            <h5 className={classes.description}>
              Ha det så mysigt med varandra så länge ;)
              </h5>

              <h5 className={classes.description}>
              PS. Även om vi inte arrangerar några träffar för tillfället så går forfarande bra att anmäla sig för att bli medlemmar, se nedan.
              </h5>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(SaveTheDate);
