import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

// @material-ui/icons
import Email from "@material-ui/icons/Email"
import People from "@material-ui/icons/People"
import Message from "@material-ui/icons/Message"

// core components

import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Button from "components/CustomButtons/Button.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx"

//import { withFirebase } from '../../../components/Firebase';
import firebase from "gatsby-plugin-firebase"
import { compose } from "recompose"
import axios from "axios"
//import ReactGA from 'react-ga'

const BecomeAMemberForm = props => {
  const { classes } = props

  const [message, setMessage] = useState({ name: "", email: "", message: "" })

  const handleChange = event => {
    console.log("event: ", event)
    console.log("event.target: ", event.target)
    console.log("message: ", message)
    const name = event.target.getAttribute("name")
    setMessage({ ...message, [name]: event.target.value })
    console.log("message after: ", message)
  }

  useEffect(() => {
    console.log("useEffect - message: ", message)
  })

  const handleSubmit = event => {
    console.log("handleSubmit - message: ", message)
    if (event) {
      event.preventDefault()
    }
  }

  return (
    <div>
      <form id="signup-form">
        <CustomInput
          labelText="Namn"
          id="name"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: "name",
            onChange: handleChange,
            type: "text",
            endAdornment: (
              <InputAdornment position="end">
                <People className={classes.inputIconsColor} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          labelText="Epost adress"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: handleChange,
            name: "email",
            type: "email",
            autoComplete: "email",
            endAdornment: (
              <InputAdornment position="end">
                <Email className={classes.inputIconsColor} />
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          labelText="Ev meddelande till oss, kod, kik etc"
          id="message"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            onChange: handleChange,
            name: "message",
            type: "text",
            endAdornment: (
              <InputAdornment position="end">
                <Message className={classes.inputIconsColor} />
              </InputAdornment>
            ),
          }}
        />
        <Button type="button" color="primary" size="lg" onClick={handleSubmit}>
          Bli medlem!
        </Button>
      </form>
    </div>
  )

  const state = {
    dataSent: false,
    open: false,
    name: "",
    email: "",
    message: "",
  }

  const componentDidMount = () => {
    this.templateId = process.env.REACT_APP_SENDGRID_WELCOME_TEMPLATEID
  }

  const handleClose = () => {
    this.setState({ open: false })
  }

  const handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  const handleEmailChange = event => {
    this.setState({ email: event.target.value })
  }

  const handleMessageChange = event => {
    this.setState({ message: event.target.value })
  }

  const handleBecomeMember = () => {
    console.log("handleBecomeMember")
    // ReactGA.event({
    //   category: 'Signup',
    //   action: 'Signup clicked'
    // });
    const email = this.state.email
    if (!this.validateEmail(email)) {
      this.setState({
        open: true,
      })

      // ReactGA.event({
      //   category: 'Signup',
      //   action: 'Signup email validation fail'
      // });

      return
    }

    console.log("state: ", this.state)
    // this.writeUserData(this.state.name, this.state.email, this.state.message)
    // his.sendWelcomeMail(this.state.email, this.state.name)

    // ReactGA.event({
    //   category: 'Signup',
    //   action: 'Signup ok'
    // });
  }

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const sendWelcomeMail = (mailTo, name) => {
    const mailConfig = {
      to: mailTo,
      from: {
        name: "Night of Passion",
        email: "fest@nightofpassion.se",
      },
      subject: "Night of Passion - Välkommen",
      text: "Night of Passion - Välkommen",
      html: "<strong>Night of Passion - Välkommen</strong>",
      templateId: this.templateId,
    }
    const mailSenderUrl = process.env.REACT_APP_MAILSENDER_URL
    const mailSenderUser = process.env.REACT_APP_MAILSENDER_USER
    const mailSenderPass = process.env.REACT_APP_MAILSENDER_PASS

    axios
      .post(mailSenderUrl, mailConfig, {
        auth: {
          username: mailSenderUser,
          password: mailSenderPass,
        },
      })
      .then(function(response) {})
      .catch(function(error) {
        console.log(error)
      })
  }

  const writeUserData = (name, email, message) => {
    this.props.firebase.doAddNewUserData(name, email, message)
    this.setState({ dataSent: true })
  }

  const render = () => {
    const dataSent = this.state.dataSent
    const { classes } = this.props

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
                <Button color="primary">OK</Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      )
    } else {
      return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <form id="signup-form">
                <CustomInput
                  labelText="Namn"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: this.handleNameChange,
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Epost adress"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: this.handleEmailChange,
                    type: "email",
                    autoComplete: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Ev meddelande till oss, kod, kik etc"
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: this.handleMessageChange,
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Message className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="button"
                  color="primary"
                  size="lg"
                  onClick={this.handleBecomeMember}
                >
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
            <DialogTitle id="alert-dialog-title">
              {"Felaktig epost"}
            </DialogTitle>
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
      )
    }
  }
}

export default compose(withStyles(productStyle))(BecomeAMemberForm)
