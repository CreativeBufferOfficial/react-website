import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/img/Logo-04.png";
import "./styles.css";
import "../Header/styles.css";
import "./styles.css";
// import Logo from '../../../assets/img/Logo/Logo-08.png';

const Index = () => {
  return (
    <Fragment>
      <nav className="header--navbar navbar" id="sticky">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#headerNav"
            >
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <p className="navbar-brand">
              <NavLink
                exact
                activeClassName="active"
                to="/"
                className="nav-link"
              >
                <img src={Logo} width="100" alt="" />
              </NavLink>
            </p>
          </div>
          <div className="header--cart-btn float--right"></div>

          <div id="headerNav" className="navbar-collapse collapse float--right">
            <ul className="header--nav-links nav">
              <li>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/"
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>
              <li>
                {/* <a href="/">Buy Crypto</a> */}
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/transaction-status"
                  className="nav-link"
                >
                  Transaction Status
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/api-documentation"
                  className="nav-link"
                >
                  Documentation
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/about"
                  className="nav-link"
                >
                  About XPort
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/affiliate"
                  className="nav-link"
                >
                  Affiliate Program
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/contact"
                  className="nav-link"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
export default Index;
