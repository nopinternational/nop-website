import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Wc from "@material-ui/icons/Wc";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ThreeBenefitsOfNoP extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
      {/*
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Let's talk product</h2>
            <h5 className={classes.description}>
              This is the paragraph where you can write more details about your
              product. Keep you user engaged by providing meaningful
              information. Remember that by this time, the user is curious,
              otherwise he wouldn't scroll to get here. Add a button if you want
              the user to see more.
            </h5>
          </GridItem>
        </GridContainer>
        */}
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Riktiga och verifierade par"
                description="Medlemmar i Night of Passion finns på riktigt. För att vara med i Night of Passion genomgår alla en verifieringsprocess, inga troll är välkomna."
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Kommunicera med andra par"
                description="Medlemmar i Night of Passion kan kontakta och kommunicera med andra på ett tryggt och säkert sätt."
                icon={Chat}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Mötas och träffas"
                description="Night of Passion ordnar träffar och fester så att par kan mötas. Ni kan själv ordna egna träffar tillsammans andra medlemmar i Night of Passion"
                icon={Wc}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ThreeBenefitsOfNoP);
