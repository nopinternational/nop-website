import React from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class AboutSringPartySection extends React.Component {
  render() {
    const { classes, sectionId } = this.props;
    return (
      <div id={sectionId} className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Om Vårfesten</h2>
            <h5 className={classes.description}>
              Om ni undrar vad som egentligen händer på våra fester så kan vi härmed presentera hur festen var utifrån ett av de deltagande paren.</h5>

              <h5 className={classes.description}>
              Happy reading!</h5>
              
              <h5 className={classes.description}>
              ---</h5>
              

            <p className={classes.description}>
              Varje år blir man lika förundrad över vårsolens första strålar.
              Hur de värmer kroppen och man känner hur livet återkommer.
              Just en sån här vårdag samlade Nights of Passion sju nyfikna par i Stockholms södra skärgård.
              När vi arrangerar träffar är det inte bara vårsolen som värmer.
            Denna weekend skapades för par som vill skratta, njuta och träffa andra par som vill ha en stund där allt är möjligt.</p>

            <p className={classes.description}>
              Vid lunchtid samlades vi i restaurangen för att äta en bit mat.
              Några par hade varit med på tidigare träffar och var med för första gången.
              Vi är mycket måna om att få alla att känna sig välkomna.
              Vår grej är att vi gör ganska mycket för att säkerställa att alla par är seriösa, sociala och fräscha.
              Känslan när man först ses och nyfiket hälsar på varandra är magisk.
                Nyfikenhet, spänning och upphetsning i en ljuvlig kombination.</p>

            <p className={classes.description}>
              Efter maten, när den första trevande nervositeten lagt sig, checkade vi in i det gemensamma huset där alla par hade egna rum.
              Därefter begav vi oss mot bastu och bubbelbad - utomhus i solen mitt i skärgården.
              Kontrasterna mellan säsongens första kalla dopp och värmen i bubbelbadet gav, tillsammans med några glas bubbel, en härlig stämning.
                Den känslan tog vi med oss tillbaka till huset där vi minglade och samtalade nyfiket - oftast kring heta ämnen.</p>
            
            <p className={classes.description}>
              Det hela ledde till att vi snurrade flaskan för att utmana varandra - ja varför inte :)
              Från heta sanningar ledde det ena till det andra och lusten tog efter ett tag överhand.
              Ganska snart började händer treva och kläder falla. Alla njöt i  fulla drag av varandra.
                Även de som kanske först tänkt sig att gå vanligt fram blev överväldigad av den otvungna, avslappnade och upphetsande atmosfären.</p>
            
            <p className={classes.description}>
              Några timmar senare var det stora leenden som nyduschade och uppfräschade begav sig mot kvällens tre rättersmiddag.
              Om lunchen varit trevande och försiktig så var stämningen en helt annan nu.
              Skratten ekade och alla visste att efter den tredje rätten väntade ännu mera godsaker.
              Natten blev lång och het.
                Det var som att tiden stod still - som att inget annat existerar än njutningen här och nu och att allt är möjligt.</p>

            <p className={classes.description}>
              Morgonen efter åt vi alla en gemensam frukost - trötta, lyckliga och med en helt ny gnista i ögonen.
              Denna söndag ville inte solen lysa på oss som den gjort dagen innan.
                Det spelade ingen roll för vi kände värmen i våra kroppar ändå.</p>

                <h5 className={classes.description}>
              Har ni glömt bort hur förutsättningarna för festen var så kan ni <Link to={"/fest"} className={classes.link}>läsa om det här</Link></h5>
          </GridItem>
        </GridContainer>
      </div >
    );
  }
}

export default withStyles(productStyle)(AboutSringPartySection);
