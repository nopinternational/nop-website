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
        setValidated(data.validation)
        setImages(data.images || [])
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

  const writesignupDataToFirebase = (userid, signupData) => {
    console.log("userid:", userid)
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
    console.log("writesImagesRefsToFirebase.userid:", userid)
    console.log("writesImagesRefsToFirebase.images:", images)
    delete signupData["password"]
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
    console.log("uploadPhoto.event: ", event)
    console.log("uploadPhoto.event.target: ", event.target)
    event.stopPropagation()
    event.preventDefault()
    const file = fileuploaded
  }

  const fileSelectorChange = event => {
    console.log("fileSelectorChange.event:", event)
    console.log("fileSelectorChange.event.target:", event.target)
    const file = event.target.files[0]
    console.log("fileSelectorChange.file: ", file)
    storePhoto(file)
  }
  const storePhoto = file => {
    console.log("uploadPhoto.file: ", file)

    var reader = new FileReader()
    reader.onload = function(event) {
      const url = event.target.result
      console.log("the_url: ", url)
      //$("#some_container_div").html("<img src='" + the_url + "' />")
      const newImages = images.concat(url)
      setImages(newImages)
    }
    reader.readAsDataURL(file)

    var metadata = {
      contentType: file.type,
    }

    var storage = firebase.storage()
    console.log("storage.app: ", storage.app)
    const storageRef = storage.ref()
    // Push to child path.
    // [START oncomplete]
    const uid = getUser().uid
    storageRef
      .child(`validation/${uid}/` + file.name)
      .put(file, metadata)
      .then(function(snapshot) {
        console.log("Uploaded", snapshot.totalBytes, "bytes.")
        console.log("File metadata:", snapshot.metadata)
        // Let's get a download URL for the file.
        snapshot.ref.getDownloadURL().then(function(url) {
          console.log("File available at", url)

          //writesImagesRefsToFirebase(uid, newImages)
          // [START_EXCLUDE]

          // [END_EXCLUDE]
        })
      })
      .catch(function(error) {
        // [START onfailure]
        console.error("Upload failed:", error)
        // [END onfailure]
      })
    // [END oncomplete]
  }

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
      trackCustomEvent({
        category: "Profile",
        action: "Validate Clicked",
      })

      console.log("handleSubmit.signupData", signupData, getUser())
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
    console.log("handleOnDeleteImage: ", src)
    const uid = getUser().uid

    //console.log("handleOnDeleteImage: ", foo.target)

    const newImages = images.filter(imageSrc => imageSrc != src)
    setImages(newImages)
    writesImagesRefsToFirebase(uid, newImages)

    var storage = firebase.storage()
    const storageRef = storage.refFromURL(src)
    // Push to child path.
    // [START oncomplete]
    storageRef
      .delete()
      .then(function(snapshot) {
        console.log(`file: ${src} deleted`)
      })
      .catch(function(error) {
        // [START onfailure]
        console.error("delete failed:", error)
        // [END onfailure]
      })
    // [END oncomplete]
  }
  const imageView = () => {
    if (!images || images.length == 0) return null
    return (
      <div>
        <GridContainer>
          {images.map((image, index) => {
            console.log("image: ", image)
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
