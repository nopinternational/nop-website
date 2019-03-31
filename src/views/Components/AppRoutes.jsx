import React from "react";
import ReactGA from 'react-ga'
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import PartyPage from "views/PartyPage/PartyPage.jsx";


const history = createBrowserHistory();
history.listen(location => {
	ReactGA.set({ page: location.pathname })
	ReactGA.pageview(location.pathname)
});

export default class AppRoutes extends React.Component {
	componentDidMount() {
		ReactGA.pageview(window.location.pathname)
	}
 
  render() {
    return(
    <Router history={history}>
      <Switch>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/fest" component={PartyPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>)
  }
}