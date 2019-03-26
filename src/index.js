import React from "react";
import ReactDOM from "react-dom";

import AppRoutes from 'views/Components/AppRoutes.jsx'


import "assets/scss/material-kit-react.scss?v=1.4.0";



import ReactGA from 'react-ga'

ReactGA.initialize('UA-134177845-1')



ReactDOM.render(
  <AppRoutes/>,
  document.getElementById("root")
);

