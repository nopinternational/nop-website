/*eslint-disable*/
import React from "react"
// react components for routing our app without refresh
import { Link } from "gatsby"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Tooltip from "@material-ui/core/Tooltip"

// @material-ui/icons
import { Apps, CloudDownload, AccountCircle } from "@material-ui/icons"

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx"
import Button from "components/CustomButtons/Button.jsx"

import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx"
import firebase from "gatsby-plugin-firebase"
import { logout } from "components/Auth/auth"

class HeaderLinks extends React.Component {
  handleSignout = () => {
    logout(firebase)
    trackCustomEvent({
      category: "MyAccount",
      action: "Signout clicked",
    })
  }

  render() {
    const { classes } = this.props
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Mitt konto "
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <Link to={"/signup"} className={classes.link}>
                <Button color="transparent" className={classes.navLink}>
                  Bli medlem
                </Button>
              </Link>,
              <Link to={"/login"} className={classes.link}>
                <Button color="transparent" className={classes.navLink}>
                  Logga in
                </Button>
              </Link>,
              <Link to={"/"} className={classes.link}>
                <Button
                  color="transparent"
                  onClick={this.handleSignout}
                  className={classes.navLink}
                >
                  Logga out
                </Button>
              </Link>,
            ]}
          />
        </ListItem>
      </List>
    )
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks)
