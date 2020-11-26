import React from "react";

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import productStyle from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';


const Article = (props) => {
    const { classes, title, children } = props;
    console.log(props)
    return (
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>{title}</h2>
          <div className={classes.description}>//article// {children}</div>
         
        </GridItem>
      </GridContainer>
    )
}

export default withStyles(productStyle)(Article)