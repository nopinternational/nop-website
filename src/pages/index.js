import React from "react"
import { createMemoryHistory } from "history"
import { Route, Router, Switch } from "react-router-dom"

import "assets/scss/material-kit-react.scss?v=1.4.0"
import "typeface-roboto"
import "typeface-roboto-slab"

// pages for this product
import LandingPage from "./LandingPage/LandingPage.jsx"

let hist = createMemoryHistory()

export default () => (
  <Router history={hist}>
    <Switch>
      <Route path="/components" component={LandingPage} />
      <Route path="/profile-page" component={LandingPage} />
      <Route path="/login-page" component={LandingPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>
)
