import React from "react"
import { Router } from "@reach/router"
import { createMemoryHistory } from "history"
import { Route, Switch } from "react-router-dom"

import "assets/scss/material-kit-react.scss?v=1.4.0"
import "typeface-roboto"
import "typeface-roboto-slab"

import firebase from "gatsby-plugin-firebase"

import PrivateRoute from "../components/PrivateRoute"
// pages for this product
import LandingPage from "./LandingPage/LandingPage.jsx"
import ValidationPage from "../components/AppPages/ValidationPage/ValidationPage.jsx"
import ProfilePage from "./ProfilePage/ProfilePage.jsx"
import LoginPage from "./LoginPage/LoginPage.jsx"

let hist = createMemoryHistory()
const Index = () => {
  console.log("Index")
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("// User is signed in.", user)
    } else {
      console.log("// No user is signed in.", user)
    }
  })

  return (
    <Router history={hist}>
      <PrivateRoute path="/app/validation" component={ValidationPage} />
      <PrivateRoute path="/app/profile" component={ProfilePage} />
      <Route path="/login" component={LoginPage} />
    </Router>
  )
}
export default Index
