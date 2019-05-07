import React from "react";
import ReactGA from 'react-ga'
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import FirebaseSignupPage from "views/SignupPage/FirebaseSignupPage.jsx";

import PartyPage from "views/PartyPage/PartyPage.jsx";
import MinglePage from "views/MinglePage/MinglePage.jsx"
import AboutSringPartyPage from "views/AboutSpringParty/AboutSringPartyPage.jsx"


const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
});


class AppRoutes extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname)
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/landing-page" component={LandingPage} />
          <Route path="/profile-page" component={ProfilePage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/fest" component={PartyPage} />
          <Route path="/om-varfesten" component={AboutSringPartyPage} />
          <Route path="/mingel" component={MinglePage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/signup2" component={FirebaseSignupPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>)
  }
}


const AppRoutes2 = ({ authUser }) => (
  <Router history={history}>
  <Switch>
    <Route path="/landing-page" component={LandingPage} />
    
    <Route path="/fest" component={PartyPage} />
    <Route path="/om-varfesten" component={AboutSringPartyPage} />
    <Route path="/mingel" component={MinglePage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/signup2" component={FirebaseSignupPage} />
    <Route path="/" component={LandingPage} />
    <Route path="/login-page" component={LoginPage} />
    <Route path="/profile-page" component={ProfilePage} />
    {/*authUser ? <NavigationAuth /> : <NavigationNonAuth /> */}
  </Switch>
    


  </Router>

);
const NavigationAuth = () => (
  <div>
    
    <Route path="/profile-page" component={ProfilePage} />
    
    <Route path="/pp" component={ProfilePage} />
    
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <Route path="/login-page" component={LoginPage} />
  </div>
);

export default AppRoutes;