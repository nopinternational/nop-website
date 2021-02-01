import React, { useEffect, useState } from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// @material-ui/icons

// core components
import Layout from "../../Layout/Layout.jsx"
import Article from "../../Article/Article.jsx"

import GridContainer from "../../Grid/GridContainer.jsx"
import GridItem from "../../Grid/GridItem.jsx"
import Parallax from "../../Parallax/Parallax.jsx"
import Quote from "../../Typography/Quote.jsx"

import landingPageStyle from "../../../assets/jss/material-kit-react/views/landingPage.jsx"

// Sections for this page
import ValidationForm from "./ValidationForm.jsx"
import firebase from "gatsby-plugin-firebase"
import { getUser } from "../../Auth/auth"

const ValidationPage = props => {
  console.log("ValidationPage: ", props)
  const { classes } = props

  const [validationStatus, setValidationStatus] = useState({
    status: "none",
    message: "no message",
  })

  useEffect(() => {
    const user = getUser()

    const uid = user.uid
    const validationDataRef = firebase
      .database()
      .ref(`/validation/${uid}/status/`)

    validationDataRef.on(
      "value",
      snapshot => {
        const data = snapshot.val()
        //setSignupData({ ...data })
        //setValidated(data.validation)
        //setImages(data.images || [])
        console.log("validationstatus: ", data)
        setValidationStatus({ ...data })
      },
      cancelCallback => {
        console.log("cancelCallback: ", cancelCallback)
      }
    )
  }, [])

  const setStatus = status => {
    const user = getUser()

    const uid = user.uid
    const validationDataRef = firebase
      .database()
      .ref(`/validation/${uid}/status/`)

    console.log("setStatus: ", status)
    const newState = { ...validationStatus, status }
    console.log("newState: ", newState)
    validationDataRef.set(newState)
    setValidationStatus(newState)
  }

  const renderValidationForm = () => {
    return (
      <Article title="Validering">
        <p>
          Nätverket Night of Passion är en exklusiv medlemsklubb. Vi tar emot
          par som medlemmar som är seriösa och som delar nätverkets värderingar.
        </p>
        <p className={classes.description}>
          Nedan kan ni ansöka om att bli medlemmar. Efter att ni har ansökt om
          medlemskap kommer vi att kontakta er.
        </p>
        <ValidationForm setValidationStatus={setStatus} />
      </Article>
    )
  }

  const renderValidationPending = () => {
    return (
      <Article title="Validering pågår...">
        <p className={classes.description}>Validering pågår...</p>
      </Article>
    )
  }
  const renderValidationConfirmed = () => {
    return (
      <Article title="Validering godkänd">
        <p className={classes.description}>Validering godkänd :)</p>
      </Article>
    )
  }
  const renderValidationRejected = () => {
    return (
      <Article title="Validering underkänd">
        <p className={classes.description}>
          Validering har blivit underkänd med följande motivering:
        </p>
        <Quote text={validationStatus.message} />
      </Article>
    )
  }

  const renderContent = () => {
    switch (validationStatus.status) {
      case "PENDING": {
        return renderValidationPending()
      }

      case "CONFIRMED": {
        return renderValidationConfirmed()
      }
      case "REJECTED": {
        return renderValidationRejected()
      }
    }
    return renderValidationForm()
  }

  return (
    <Layout>
      <Parallax filter image={require("assets/img/zero.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Night of Passion</h1>
              <h4>Socialt. Passion. Sex.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}></div>
        {renderContent()}
      </div>
    </Layout>
  )
}

export default withStyles(landingPageStyle)(ValidationPage)
