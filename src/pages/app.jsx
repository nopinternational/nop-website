import React from "react"
import { Router } from "@reach/router"
import { createMemoryHistory } from "history"
import { Route } from "react-router-dom"

import "assets/scss/material-kit-react.scss?v=1.4.0"
import "typeface-roboto"
import "typeface-roboto-slab"

import PrivateRoute from "../components/PrivateRoute"
// pages for this product
import ValidationPage from "../components/AppPages/ValidationPage/ValidationPage.jsx"
import LoginPage from "./LoginPage/LoginPage.jsx"

let hist = createMemoryHistory()
const Index = () => {
  return (
    <Router history={hist}>
      <PrivateRoute path="/app/validation" component={ValidationPage} />
      <PrivateRoute path="/app/profile" component={ValidationPage} />
      <Route path="/login" component={LoginPage} />
    </Router>
  )
}
export default Index
