import React, { useState } from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// core components
import Button from "../../CustomButtons/Button.jsx"

import { compose } from "recompose"
import typographyStyle from "../../../assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx"
import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx"
const ValidationImage = props => {
  console.log("ValidationImage.props: ", props)
  const { classes, src, onDelete } = props

  const onclick = event => {
    console.log("onclick: ", event)
    console.log("onclick: ", event.target)
    console.log("onclick.src: ", src)
    console.log("onDElete: ", onDelete)

    onDelete(src)
  }
  return (
    <div>
      <img className={classes.imgRounded + " " + classes.imgFluid} src={src} />
      <Button type="button" color="primary" size="sm" onClick={onclick}>
        Ta bort
      </Button>
    </div>
  )
}
export default compose(withStyles(typographyStyle))(ValidationImage)
