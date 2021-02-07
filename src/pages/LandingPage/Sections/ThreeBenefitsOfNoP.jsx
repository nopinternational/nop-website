import React from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// @material-ui/icons
import Chat from "@material-ui/icons/Chat"
import VerifiedUser from "@material-ui/icons/VerifiedUser"
import Wc from "@material-ui/icons/Wc"
import Home from "@material-ui/icons/Home"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import InfoArea from "components/InfoArea/InfoArea.jsx"

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const ThreeBenefitsOfNoP = ({ articles, classes }) => {
  articles = articles || []

  //this depends on the articles, should be bundled with each article
  const meta = [
    { icon: VerifiedUser, iconColor: "success" },
    { icon: Chat, iconColor: "info" },
    { icon: Wc, iconColor: "danger" },
    { icon: Home, iconColor: "info" }, //default icon if articles.length > meta.length
  ]

  const renderInfoArea = (article, meta, index) => {
    return (
      <GridItem xs={12} sm={12} md={4} key={index}>
        <InfoArea
          title={article.title}
          description={documentToReactComponents(article.body.json)}
          icon={meta.icon}
          iconColor={meta.iconColor}
          vertical
        />
      </GridItem>
    )
  }

  return (
    <div className={classes.section}>
      <div>
        <GridContainer>
          {articles.map((article, index) =>
            renderInfoArea(
              article,
              meta[Math.min(index, meta.length - 1)],
              index
            )
          )}
        </GridContainer>
      </div>
    </div>
  )
}

export default withStyles(productStyle)(ThreeBenefitsOfNoP)
