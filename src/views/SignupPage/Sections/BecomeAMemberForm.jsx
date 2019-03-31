import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Message from "@material-ui/icons/Message";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

import firebase from 'firebase/app';
import 'firebase/database';
class AboutNoP extends React.Component {

  state = {
    dataSent: false,
    open: false,
    name: '',
    email: '',
    message: ''
  };



  componentDidMount() {
    const   config = {
      apiKey: "AIzaSyBvsvqTM8uSO60h54ZnDM2HuBb6OaN1LWs",
      authDomain: "ultra-guard-182606.firebaseapp.com",
      databaseURL: "https://ultra-guard-182606.firebaseio.com",
      projectId: "ultra-guard-182606",
      storageBucket: "ultra-guard-182606.appspot.com",
      messagingSenderId: "928295750233"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      this.fb_database = firebase.database();
    }
  }


  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  };

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  };

  handleMessageChange = (event) => {
    this.setState({message: event.target.value})
  };

  
  handleBecomeMember = () => {
    this.setState({
      open: false,
    });
    this.writeUserData (this.state.email,this.state.email,this.state.message);
  };

  writeUserData = (name, email, message) => {
    this.fb_database.ref('users').push().set({
      username: name,
      email,
      message,
      created: new Date().toISOString()
    });
    this.setState({dataSent: true})
  }

  render() {

    const dataSent = this.state.dataSent;
    const { classes } = this.props;

    if (dataSent) {
      
      return (
        <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Bli medlem</h2>
            <h5 className={classes.description}>
            Tack så mycket, nu är du med :)
            </h5>
            <Link to={"/"} className={classes.link}>
              <Button
              color="primary">
                OK
              </Button>
            </Link>
          </GridItem>
        </GridContainer>
        
        </div>
      )
    }
    else {
      return (
        <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Bli medlem</h2>
            <h5 className={classes.description}>
              Nätverket Night of Passion är en exklusiv medlemsklubb. Vi tar emot par som medlemmar som är seriösa och som delar nätverkets värderingar.
            </h5>
            <h5 className={classes.description}>
              Nedan kan ni ansöka om att bli medlemmar. Efter att ni har ansökt om medlemskap kommer vi att kontakta er.
            </h5>

            <form id="signup-form" >

              <CustomInput
                labelText="Namn"
                id="name"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  inputProps:  {onChange: this.handleNameChange},
                  type: "text",
                  endAdornment: (
                    <InputAdornment position="end">
                      <People className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
              <CustomInput
                labelText="Epost adress"
                id="email"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  inputProps:  {onChange: this.handleEmailChange},
                  type: "email",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
              <CustomInput
                labelText="Ev meddelande till oss, kod, kik etc"
                id="message"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  inputProps:  {onChange: this.handleMessageChange},
                  type: "text",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Message className={classes.inputIconsColor} />
                    </InputAdornment>
                  )
                }}
              />
              <Button  type="button" color="primary" size="lg" onClick={this.handleBecomeMember}>
                Bli medlem!
              </Button>
            </form>
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
}

export default withStyles(productStyle)(AboutNoP);
