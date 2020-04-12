import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import Header from 'components/Header/Header.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';

import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx';

//Contentful
import withContentfulClient from 'components/Contentful/withContentfulClient.jsx';
import CtfArticle from '../Components/CtfArticle.jsx';

const dashboardRoutes = [];

class PartyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const { getEntry } = this.props;
    const documentId = '5MkWpS3NjjC6wBhqabgBkA'; //entryid from ctf

    getEntry(documentId)
      .then((result) => {
        this.setState({ articles: result.fields.articles });
      })
      .catch((error) => {
        console.log('error from withCtf: ', error);
      });
  }

  render() {
    const { classes, ...rest } = this.props;
    const articles = this.state.articles;

    const renderArticles = () => {
      return articles ? articles.map((article, index) => <CtfArticle key={index} documentId={article.sys.id} />) : null;
    };

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Night of Passion"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: 'white',
          }}
          {...rest}
        />
        <Parallax filter image={require('assets/img/zero.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Night of Passion</h1>
                <h4>Socialt. Passion. Sex.</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>{renderArticles()}</div>
        </div>
        {/*
        <Footer />
        */}
      </div>
    );
  }
}

export default withContentfulClient(withStyles(landingPageStyle)(PartyPage));
