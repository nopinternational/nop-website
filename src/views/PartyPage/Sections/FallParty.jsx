import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class SpringParty extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Vårfest 6e april</h2>
            <h5 className={classes.description}>
            Våren är i antågande och då är det dags för en fest igen. Vi har ett beprövat och uppskattat upplägg som påminner om en mini-weekend, där vi tillsammans med en dryg handfull trevliga sköna par träffas på en herrgård, hotell eller dyl en bit utanför stan. Vi drar igång med bubbel och mingel på tidig lördag eftermiddag och avslutar dagen efter. Tiden där i mellan kommer vi fylla med en massa trevliga aktiviteter :)
            </h5>
            <h5 className={classes.description}>
            Till festen så söker vi sköna trevliga etablerade par som vill och kan vara med från tidig lördag em. Festen är på ett hotell och ni kommer själva betala för rum och middag, själva festen kostar inget. Anläggningen ligger ca 1h från Stockholm.
            </h5>
            <h5 className={classes.description}>
            Allt under festen är såklart frivilligt och ett nej respekteras. Men vi tror för att festen ska bli så lyckad som möjligt så bör alla komma med sinnet att det är okej att ha sex med andra par. Vi vill ha en skön fest där alla är med på lika villkor. Är ni bara intresserade av att titta eller vara för er själva så är inte den här festen något för er.
            </h5>
            <h5 className={classes.description}>
            För att bli inbjuden till festen och för att ni ska trivas så tror vi...
            </h5>
            <h5 className={classes.description}>
            <ul><li>
              Ni är ett stabilt par
              </li><li>
              Ni gillar vara med andra par
              </li><li>
              Ni värdesätter att umgås socialt med andra par
              </li><li>
              Ni är i åldern 30-45år, men vi gör undantag för rätt par
              </li><li>
              Ni kan vara med lördag kring lunch till söndag fm.
              </li><li>
              Ni båda vill vara aktiva under kvällen och inte bara exklusiva för varandra
              </li><li>
              Ni är okej med kostnad ca 2500kr/par för boende, badtunna etc, mat & dricka tillkommer. 1000kr betalas i förskott när ni blir inbjudna. Allt är självkostnadspris
              </li><li>
              Ni verifierar med bild i samband med anmälan och är beredd på att ta en drink/fika eller telefonsamtal innan festen
              </li><li>
              Vi kommer att prioritera öppna, trevliga, ärliga par där vi tror att ni kommer passa ihop med övriga på festen. Vi har därför inte möjlighet att kunna erbjuda alla par en plats på festen.
            </li></ul>
            </h5>
            <h2 className={classes.title}>Anmälan till vårfest</h2>
            <h5 className={classes.description} style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
            Är ni intresserade av att vara med? Anmäl ert intresse genom att gå med i Night of Passion. Ange 'Vårfest2019' som meddelande till oss.
            </h5>
            <h5 className={classes.description}>Vårfesten har redan varit...</h5>
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

export default withStyles(productStyle)(SpringParty);
