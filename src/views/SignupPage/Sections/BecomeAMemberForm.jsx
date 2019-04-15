import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

import { withFirebase } from '../../../components/Firebase';
import { compose } from 'recompose';
import firebase from 'firebase/app';
import 'firebase/database';
import sgMail from '@sendgrid/mail';

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
      apiKey: process.env.REACT_APP_FIREBSE_APIKEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
      
    }
    this.fb_database = firebase.database();
    this.templateId = process.env.REACT_APP_SENDGRID_WELCOME_TEMPLATEID
  }

  handleClose = () => {
    this.setState({ open: false });
  };

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
<<<<<<< Updated upstream
    const email = this.state.email;
    if (!this.validateEmail(email)) {
      this.setState({
        open: true,
      });
      return
    }
    this.setState({ open: true });
    this.writeUserData (this.state.name,this.state.email,this.state.message);
    this.sendWelcomeMail(this.state.email,this.state.name);
=======
    this.setState({
      open: false,
    });
    this.writeUserData(this.state.email,this.state.email,this.state.message);
>>>>>>> Stashed changes
  };

  validateEmail = (email)  => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

  }
  sendWelcomeMail = (mailTo, name) => {
    sgMail.setApiKey(process.env.REACT_APP_SENDGRID_APIKEY);
    
    const msg = {
      to: mailTo,
      from: {
        name: 'Night of Passion',
        email: 'fest@nightofpassion.se',
      },
      subject: 'Night of Passion - Välkommen',
      text: 'Night of Passion - Välkommen',
      html: '<strong>Night of Passion - Välkommen</strong>',
      templateId: this.templateId,
    };
    sgMail.send(msg);
  }

  writeUserData = (name, email, message) => {
    console.log('writeUserData',name,email,message)
    /*
    this.fb_database.ref('users').push().set({
      username: name,
      email,
      message,
      created: new Date().toISOString()
    });
    this.setState({dataSent: true})
    */
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
            Tack så mycket, vi kommer strax att skicka ett mail till er. 
            (Får ni inget mail så kolla en extra gång i spam-foldern)
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
                    onChange: this.handleNameChange,
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
                    onChange: this.handleEmailChange,
                    type: "email",                  
                    autoComplete: "email",
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
                    onChange: this.handleMessageChange,
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
          <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Felaktig epost"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Eposten är på ett ogiltigt format.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
        </div>
      );
    }
  }
}

export default compose(
  withFirebase,
  withStyles(productStyle),
  )(AboutNoP);
