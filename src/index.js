import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from 'views/Components/AppRoutes';
import ReactGA from 'react-ga';
import Firebase, { FirebaseContext } from './components/Firebase';
import 'assets/scss/material-kit-react.scss?v=1.4.0';

ReactGA.initialize('UA-134177845-1');

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <AppRoutes />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
