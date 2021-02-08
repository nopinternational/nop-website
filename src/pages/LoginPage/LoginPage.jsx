import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

// @material-ui/icons
import FavoriteIcon from "@material-ui/icons/Favorite"
import Email from "@material-ui/icons/Email"
import LockOutlined from "@material-ui/icons/LockOutlined"
// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Button from "components/CustomButtons/Button.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardFooter from "components/Card/CardFooter.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx"

import firebase from "gatsby-plugin-firebase"
import { setUser } from "components/Auth/auth"

import image from "assets/img/bg7.jpg"

//class LoginPage extends React.Component {
const LoginPage = props => {
  const { classes } = props
  const [cardAnimaton, setCardAnimaton] = useState("cardHidden")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [showDialog, setShowDialog] = useState(false)
  const [dialogMessaage, setDialogMessage] = useState("")

  const handleChange = event => {
    const name = event.target.getAttribute("name")

    setLoginData({ ...loginData, [name]: event.target.value })
  }

  useEffect(() => {
    setTimeout(function() {
      setCardAnimaton("")
    }, 700)
  })

  const handleSubmit = event => {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(result => {
        console.log("signin.result: ", result)
        setUser(result.user)
        navigate("/app/validation")
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === "auth/weak-password") {
          setDialogMessage("Lösenordet är för enkelt, välj ett svårare")
          setShowDialog(true)
        } else if (errorCode === "auth/email-already-in-use") {
          setShowDialog(true)
          setDialogMessage(
            "Eposten finns redan registrerad hos oss, vänligen välj en annan eller återställ ditt lösenord"
          )
        } else if (errorCode === "auth/invalid-email") {
          setDialogMessage("Eposten har ett ogiltigt format")
          setShowDialog(true)
        } else if (errorCode === "auth/operation-not-allowed") {
          setDialogMessage(
            "Hoppla, nu har det hänt något oväntat. Vi ska ta reda på vad som hänt och fixa det!"
          )
          setShowDialog(true)
        } else if (errorCode === "auth/wrong-password") {
          setDialogMessage("Hoppla, nu har ni angett fel epost och lösenord")
          setShowDialog(true)
        }
        console.log(error)
      })
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    {/*<div className={classes.socialLine}>
                       <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <FaTwitter />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <FaFacebook />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <FaGooglePlusG />
                      </Button>
                    </div> */}
                  </CardHeader>
                  {/* <p className={classes.divider}>Or Be Classical</p> */}
                  <CardBody>
                    {/* <CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    /> */}
                    <CustomInput
                      labelText="Epost"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        name: "email",
                        onChange: handleChange,
                        value: loginData.email,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        name: "password",
                        onChange: handleChange,
                        value: loginData.password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockOutlined />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg" onClick={handleSubmit}>
                      <FavoriteIcon className={classes.icons} />
                      Låt det roliga börja
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
          <Dialog
            open={showDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Felaktig login"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogMessaage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
export default withStyles(loginPageStyle)(LoginPage)
