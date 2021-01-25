import React, { createRef, useState } from "react"
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
import Image from "@material-ui/icons/Image"
import AddAPhoto from "@material-ui/icons/AddAPhoto"
import Lock from "@material-ui/icons/Lock"
import VerifiedUser from "@material-ui/icons/VerifiedUser"

// core components
import Button from "../../CustomButtons/Button.jsx"
import CustomInput from "../../CustomInput/CustomInput.jsx"
import InfoArea from "../../InfoArea/InfoArea.jsx"
import GridContainer from "../../Grid/GridContainer.jsx"
import GridItem from "../../Grid/GridItem.jsx"

import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx"

import firebase from "gatsby-plugin-firebase"
import { getUser, isLoggedIn } from "../../Auth/auth"
import { compose } from "recompose"

import { trackCustomEvent } from "gatsby-plugin-google-analytics"

import ValidationImage from "./ValidationImage.jsx"
import { get } from "core-js/fn/reflect"

const BecomeAMemberForm = props => {
  const { classes } = props

  const fileInputRef = createRef()
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    message: "",
    validationPicture: "",
  })

  const [isValidated, setValidated] = useState(false)
  const [fileuploaded, setFileuploaded] = useState()
  const [images, setImages] = useState([])

  React.useEffect(() => {
    const user = getUser()

    const userFromFirebase = firebase.auth().currentUser
    const uid = user.uid
    const validationDataRef = firebase.database().ref("/validation/" + uid)

    validationDataRef.on(
      "value",
      snapshot => {
        const data = snapshot.val()
        setSignupData({ ...data })
        setValidated(data.validation)
        setImages(data.images || [])
      },
      cancelCallback => {
        console.log("cancelCallback: ", cancelCallback)
      }
    )
  }, [])

  const [showDialog, setShowDialog] = useState(false)
  const [dataSent, setDataSent] = useState(false)

  const handleChange = event => {
    const name = event.target.getAttribute("name")
    setSignupData({ ...signupData, [name]: event.target.value })
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  const writesignupDataToFirebase = (userid, signupData) => {
    delete signupData["password"]
    const dataRef = firebase.database().ref("validation/" + userid)

    const now = new Date().toISOString()
    //.push(userid + "-hello")
    dataRef
      .update({
        message: signupData.message,
        created: now,
      })
      .catch(error => {
        console.error(error)
      })
  }
  const writesImagesRefsToFirebase = (userid, images) => {
    const dataRef = firebase.database().ref("validation/" + userid)
    dataRef
      .update({
        images,
      })
      .catch(error => {
        console.error(error)
      })
  }

  const uploadPhoto = event => {
    fileInputRef.current.click()
    event.stopPropagation()
    event.preventDefault()
    const file = fileuploaded
  }

  const fileSelectorChange = event => {
    const file = event.target.files[0]
    storePhoto(file)
  }
  const storePhoto = file => {
    var reader = new FileReader()
    reader.onload = function(event) {
      const url = event.target.result
      const newImages = images.concat(url)
      setImages(newImages)
    }
    reader.readAsDataURL(file)

    var metadata = {
      contentType: file.type,
    }

    var storage = firebase.storage()
    const storageRef = storage.ref()
    const uid = getUser().uid
    storageRef
      .child(`validation/${uid}/` + file.name)
      .put(file, metadata)
      .then(function(snapshot) {
        //image uploaded
      })
      .catch(function(error) {
        console.error("Upload failed:", error)
      })
  }

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
      trackCustomEvent({
        category: "Profile",
        action: "Validate Clicked",
      })

      writesignupDataToFirebase(getUser().uid, signupData)
      trackCustomEvent({
        category: "Signup",
        action: "Validate Ok",
      })
    }
  }

  const validatedView = () => {
    return (
      <div>
        <hr></hr>
        <InfoArea
          title="Verified"
          description="You have been verified"
          icon={VerifiedUser}
          iconColor="success"
          vertical
        />
        <Link to={"/"} className={classes.link}>
          <Button color="primary">OK</Button>
        </Link>
      </div>
    )
  }

  const handleOnDeleteImage = src => {
    const uid = getUser().uid

    const newImages = images.filter(imageSrc => imageSrc != src)
    setImages(newImages)
    writesImagesRefsToFirebase(uid, newImages)

    var storage = firebase.storage()
    const storageRef = storage.refFromURL(src)
    storageRef
      .delete()
      .then(function(snapshot) {
        // file deleted
      })
      .catch(function(error) {
        console.error("delete failed:", error)
      })
  }
  const imageView = () => {
    if (!images || images.length == 0) return null
    return (
      <div>
        <GridContainer>
          {images.map((image, index) => {
            return (
              <GridItem xs={12} sm={6} md={4} key={index}>
                <ValidationImage src={image} onDelete={handleOnDeleteImage} />
              </GridItem>
            )
          })}
        </GridContainer>
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
          <Button color="primary" round onClick={uploadPhoto}>
            <AddAPhoto className={classes.icons} />
          </Button>
          <input
            style={{ display: "none" }}
            type="file"
            id="fileupload"
            ref={fileInputRef}
            onChange={fileSelectorChange}
          />
          {imageView()}
          <Button
            type="button"
            color="primary"
            size="lg"
            onClick={handleSubmit}
          >
            Validera
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

  return isValidated ? validatedView() : formView()
}

export default compose(withStyles(productStyle))(BecomeAMemberForm)
