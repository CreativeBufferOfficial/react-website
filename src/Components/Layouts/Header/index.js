import React, { Fragment } from "react";
import Navbar from "../Navbar/index";
import { NavLink } from "react-router-dom";
import "./styles.css";

const navbar = () => {
  return (
    <div>
      <header className="header--section">
        <div className="header--topbar">
          <div className="container">
            <ul className="nav social float--left hidden-xs">
              <li>
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-google-plus" />
                </a>
              </li>
            </ul>
            <ul className="nav button float--right">
              <li className="mr--15">
                <NavLink
                  exact
                  activeClassName="active"
                  to="/auth/signup"
                  className="btn btn-sm btn-primary"
                >
                  Merchant/Affiliate Sign Up
                </NavLink>
              </li>

              <li>
                <NavLink
                  exact
                  activeClassName="active"
                  to="/auth/login"
                  className="btn btn-sm btn-primary"
                >
                  Merchant Login
                </NavLink>
              </li>
              <li>&nbsp;</li>
            </ul>
          </div>
        </div>
        <Navbar />
      </header>
    </div>
  );
};

export default navbar;
