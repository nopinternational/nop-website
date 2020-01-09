import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class MingleSection extends React.Component {
  render() {
    const { classes, sectionId} = this.props;
    return (
      <div id={sectionId} className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>After-Work-mingel - Fredag 24 Januari</h2>
            <h5 className={classes.description}>
              Vi ordnar en mingelträff i form av en After Work i Stockholm city där ni kan mingla tillsammans med andra sociala sexiga par.
              Under kvällen så kommer ni få träffa par som är öppna för fester och träffar tillsammans med andra par.
              Se det som en kemiträff de luxe!</h5>

            <h5 className={classes.description}>
              Vårt nätverk består av väldigt trevliga och sociala par.
              Ta chansen att träffa dom och passa på att gå med i Night of Passion själva! 
              Night of Passion är ett nätverk vars medlemmar ska vara riktiga och verifierade par.</h5>

            <h5 className={classes.description}>
              Under kvällen så kommer ni även att få möjlighet att träffa paren bakom Night of Passion och få mer information om hur nätverket fungerar.
              Ni har även möjlighet att verifiera er som ett riktigt par för Night of Passion vilket gör det möjligt för er att kunna vara med på fler event framöver, inte bara mingelträffen som den här. </h5>


            <h5 className={classes.description}>
              För att ni ska trivas på den här träffen så tror vi att ni...
              <ul><li>
              gärna går på en AW för att det är trevligt och festligt
              </li><li>
              ni kan komma på After Work 24/1 någon gång mellan 18-20
              </li><li>
              är ett par som vill träffa andra par, eller kanske flera ;)
              </li><li>
              är ett par i åldern 30-50 eller däromkring
              </li><li>
              är intresserade av träffar och fester som arrangeras av Night of Passion
              </li><li>
              ni verifierar er med bild till arrangörsparet innan mingelträffen
              </li></ul>
            </h5>

            <h5 className={classes.description}>
              Mingelträffen kommer att ske på en publik bar i Stockholms city.
              Respektera andras önskan att vara diskret i samband med träffen. Det som händer på AWn stannar på AWn som man brukar säga...</h5>

            <h5 className={classes.description}>
            För att vara med på mingelträffen så är första steget att anmäla er till Night of Passion, skriv 'MINGEL-24jan' som meddelande så vi vet att ni vill komma på den här träffen. 
            Vi kommer sedan kontakta er så att ni kan göra en bild-verifiering. 
            Endast par som har anmält sig till Night of Passion och gjort bild-verifiering kommer att bjudas in till mingelträffen. 
            Vi kommer att tacka nej till par som inte är seriösa eller som vi tror på annat sätt inte delar träffen eller nätverkets värderingar.</h5>
          {/*
            <h5 className={classes.description} style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
            Anmäl er till träffen genom att bli medlem i Night of Passion.</h5>

            <h5 className={classes.description}>Mingelträffen har redan varit...</h5> 
          */}
          <h5 className={classes.description}>
            Par som redan är med och verifierade i Night of Passion kan anmäla sig till den email som skickats ut i inbjudan.</h5>
        </GridItem>
      </GridContainer>
    </div >
    );
  }
}

export default withStyles(productStyle)(MingleSection);
