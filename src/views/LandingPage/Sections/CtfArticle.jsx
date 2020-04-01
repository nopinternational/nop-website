import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import productStyle from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx';
// Contentful Client example
import { createClient } from 'contentful';

import PropTypes from 'prop-types';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

class Article extends React.Component {
  constructor(props) {
    super(props);
    const jsonArticle = JSON.parse(
      '{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"oy80fdwttoot"}},"id":"9MQtRpSOMjaZqxpW0SRXD","type":"Entry","createdAt":"2020-03-27T13:16:27.056Z","updatedAt":"2020-04-01T18:19:23.398Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":2,"contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"article"}},"locale":"en-US"},"fields":{"title":"Hello world","body":{"data":{},"content":[{"data":{},"content":[{"data":{},"marks":[],"value":"lorem ipsum...","nodeType":"text"}],"nodeType":"paragraph"}],"nodeType":"document"},"background":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"oy80fdwttoot"}},"id":"2fM3ckL9IkeWwQmmwI2iEU","type":"Asset","createdAt":"2018-12-30T15:59:28.250Z","updatedAt":"2018-12-30T15:59:28.250Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":1,"locale":"en-US"},"fields":{"title":"spotlight03","file":{"url":"//images.ctfassets.net/oy80fdwttoot/2fM3ckL9IkeWwQmmwI2iEU/4d2c65a943fb882463ca59dfdc7b6387/spotlight03.jpg","details":{"size":517572,"image":{"width":1440,"height":900}},"fileName":"spotlight03.jpg","contentType":"image/jpeg"}}},"cta":[{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"oy80fdwttoot"}},"id":"45r5ewSNf3A1BVHf6Bcx6h","type":"Entry","createdAt":"2020-04-01T18:19:10.396Z","updatedAt":"2020-04-01T18:19:10.396Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"revision":1,"contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"cta"}},"locale":"en-US"},"fields":{"text":"Bli medlemXXX","link":"/signupXXX"}}]}}'
    );
    this.state = {
      document: jsonArticle,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    this.getEntry('9MQtRpSOMjaZqxpW0SRXD')
      .then((result) => {
        this.setState({
          document: result,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  getClient = async () => {
    const createClientParam = {
      space: process.env.REACT_APP_CTF_SPACEID,
      accessToken: process.env.REACT_APP_CTF_CDN,
    };

    const client = await createClient(createClientParam);
    return client;
  };

  getEntry = async (id) => {
    const client = await this.getClient();
    const entry = await client.getEntry(id, { include: 10 });
    return entry;
  };

  render() {
    const { classes } = this.props;
    const { document } = this.state;
    const options = {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => children,
        //[BLOCKS.QUOTE]: (node, children) => <div className="quotation">{children}</div>,
        //[MARKS.BOLD]: (node, children) => <span className="bold-title">{children}</span>,
      },
    };

    const body = document.fields.body;
    const title = document.fields.title;
    const cta = document.fields.cta;

    const renderCTA = (ctaArray) => {
      return ctaArray ? (
        <Link to={ctaArray[0].fields.link} className={classes.link}>
          <Button color="primary">{ctaArray[0].fields.text}</Button>
        </Link>
      ) : null;
    };

    const article = documentToReactComponents(body, options);
    //<div className="article-wrapper" style={{ backgroundImage: `url(${background && background.fields.file.url})` }}>
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.description}>{article}</div>

            <h5>För mer info om träffen klicka nedan.</h5>
            {renderCTA(cta)}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(productStyle)(Article);
