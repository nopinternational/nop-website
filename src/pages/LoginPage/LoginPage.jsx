import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
// @material-ui/icons
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
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.")
        } else {
          alert(errorMessage)
        }
        console.log(error)
      })
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
                      labelText="Email..."
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
                    <Button
                      simple
                      color="primary"
                      size="lg"
                      onClick={handleSubmit}
                    >
                      Login & Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  )
}
export default withStyles(loginPageStyle)(LoginPage)
