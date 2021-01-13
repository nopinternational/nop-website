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
import TextField from "@material-ui/core/TextField"

// @material-ui/icons
import Email from "@material-ui/icons/Email"
import People from "@material-ui/icons/People"
import Message from "@material-ui/icons/Message"
import Lock from "@material-ui/icons/Lock"

// core components
import Button from "components/CustomButtons/Button.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx"

import firebase from "gatsby-plugin-firebase"
import { getUser, isLoggedIn } from "components/Auth/auth"
import { compose } from "recompose"

import { trackCustomEvent } from "gatsby-plugin-google-analytics"

const BecomeAMemberForm = props => {
  const { classes } = props

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    message: "",
    password: "",
  })

  React.useEffect(() => {
    const user = getUser()
    console.log("user:", user)
    console.log("user.uid:", user.uid)

    const userFromFirebase = firebase.auth().currentUser
    console.log("userFromFirebase: ", userFromFirebase)
    //console.log("userFromFirebase.uid: ", userFromFirebase?.uid)
    const uid = user.uid
    const validationDataRef = firebase.database().ref("/validation/" + uid)

    validationDataRef.on(
      "value",
      snapshot => {
        console.log("snapshot: ", snapshot)
        const data = snapshot.val()
        console.log("data: ", data)
        console.log("useEffect1.signupData", signupData)
        setSignupData({ ...data })
        console.log("useEffect2.signupData", signupData)
      },
      cancelCallback => {
        console.log("cancelCallback: ", cancelCallback)
      }
    )
  }, [])

  const [showDialog, setShowDialog] = useState(false)
  const [dataSent, setDataSent] = useState(false)

  const handleChange = event => {
    console.log("handleChange1.signupData", signupData)
    const name = event.target.getAttribute("name")
    setSignupData({ ...signupData, [name]: event.target.value })
    console.log("handleChange2.signupData", signupData)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function signupUser(signupData) {
    console.log(firebase)
    console.log(firebase.database)
    console.log(firebase.auth)

    firebase
      .auth()
      .createUserWithEmailAndPassword(signupData.email, signupData.password)
      .then(createdUser => {
        console.log("createdUser", createdUser)
        writesignupDataToFirebase(createdUser.user.uid, signupData)
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.")
        } else {
          alert(errorMessage)
        }
        console.log(error)
      })

    //console.log("created user: ", user)

    // firebase
    //   .database()
    //   .ref("users")
    //   .push()
    //   .set({
    //     ...signupData,
    //     created: new Date().toISOString(),
    //   })
  }

  const writesignupDataToFirebase = (userid, signupData) => {
    console.log("userid:", userid)
    delete signupData["password"]
    firebase
      .database()
      .ref("validation/" + userid)
      //.push(userid + "-hello")
      .set({
        ...signupData,
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

      console.log("handleSubmit.signupData", signupData)

      trackCustomEvent({
        category: "Signup",
        action: "Signup Ok",
      })
    }
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
              value: signupData.name,
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
              value: signupData.email,
              endAdornment: (
                <InputAdornment position="end">
                  <Email className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            labelText="Önskat lösenord"
            id="password"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: handleChange,
              name: "password",
              type: "password",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock className={classes.inputIconsColor} />
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
              value: signupData.message,
              endAdornment: (
                <InputAdornment position="end">
                  <Message className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            labelText="Ev meddelande till oss, kod, kik etc"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: true,
              rows: 4,
              onChange: handleChange,
              name: "message2",
              type: "text",
              value: signupData.message,
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
