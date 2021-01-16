import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { isLoggedIn } from "./Auth/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  console.log("PrivateRoute")
  console.log("PrivateRoute.location: ", location)
  console.log("PrivateRoute.componenet: ", Component || "<undef>")
  console.log("PrivateRoute.rest: ", rest)

  //if (!isLoggedIn() && location.pathname !== `/app/login`) {
  if (!isLoggedIn()) {
    // If we’re not logged in, redirect to the home page.
    console.log("PrivateRoute: not loggedin")
    navigate(`/`, { replace: true })
    return null
  }
  console.log("PrivateRoute: logged in I guess...")
  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
