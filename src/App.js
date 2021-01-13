import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "react-router-scroll-top";
import history from "./@history";
import Routes from "./Routes";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/fontawesome-stars-o.min.css";
import "./assets/css/responsive-style.css";
import "./assets/css/colors/theme-color-3.css";
// import './assets/css/style.css';

const App = () => {
  return (
    <Fragment>
      <Router history={history}>
        <ScrollToTop>
          <Routes />
        </ScrollToTop>
      </Router>
    </Fragment>
  );
};
export default App;
