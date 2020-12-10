import React, { useState } from "react"
import { Link } from "gatsby"
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
import Button from "components/CustomButtons/Button.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx"

import firebase from "gatsby-plugin-firebase"
import { compose } from "recompose"
import axios from "axios"

import { trackCustomEvent } from "gatsby-plugin-google-analytics"

const BecomeAMemberForm = props => {
  const { classes } = props

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [showDialog, setShowDialog] = useState(false)
  const [dataSent, setDataSent] = useState(false)

  const handleChange = event => {
    const name = event.target.getAttribute("name")
    setSignupData({ ...signupData, [name]: event.target.value })
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function writesignupDataToFirebase(signupData) {
    firebase
      .database()
      .ref("users")
      .push()
      .set({
        username: signupData.name,
        email: signupData.email,
        message: signupData.message,
        created: new Date().toISOString(),
      })
  }

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
      trackCustomEvent({
        category: "Signup",
        action: "Signup Clicked",
      })

      if (!validateEmail(signupData.email)) {
        setShowDialog(true)
        return
      }

      console.log("this is what should be pushed to firebase: ", signupData)
      writesignupDataToFirebase(signupData)
      sendWelcomeMail(signupData.email, signupData.name)
      setDataSent(true)

      trackCustomEvent({
        category: "Signup",
        action: "Signup Ok",
      })
    }
  }

  const sendWelcomeMail = (mailTo, name) => {
    const templateId = process.env.REACT_APP_SENDGRID_WELCOME_TEMPLATEID
    const mailSenderUrl = process.env.REACT_APP_MAILSENDER_URL
    const mailSenderUser = process.env.REACT_APP_MAILSENDER_USER
    const mailSenderPass = process.env.REACT_APP_MAILSENDER_PASS

    const mailConfig = {
      to: mailTo,
      from: {
        name: "Night of Passion",
        email: "fest@nightofpassion.se",
      },
      subject: "Night of Passion - Välkommen",
      text: "Night of Passion - Välkommen",
      html: "<strong>Night of Passion - Välkommen</strong>",
      templateId: templateId,
    }

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

  const dataSentView = () => {
    return (
      <div>
        <hr></hr>
        <p className={classes.highlight}>
          Tack så mycket, vi kommer strax att skicka ett mail till er. (Får ni
          inget mail så kolla en extra gång i spam-foldern)
        </p>
        <Link to={"/"} className={classes.link}>
          <Button color="primary">OK</Button>
        </Link>
      </div>
    )
  }

  const formView = () => {
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
          <Button
            type="button"
            color="primary"
            size="lg"
            onClick={handleSubmit}
          >
            Bli medlem!
          </Button>
        </form>
        <Dialog
          open={showDialog}
          onClose={handleCloseDialog}
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
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  return dataSent ? dataSentView() : formView()
}

export default compose(withStyles(productStyle))(BecomeAMemberForm)
