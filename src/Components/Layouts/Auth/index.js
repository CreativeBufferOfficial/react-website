import React, { Fragment, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "../../Pages/Auth/Signup";
import Login from "../../Pages/Auth/Login";
import Navbar from "../Header/index";
import Wizard from "../../Pages/Form/Wizard";
import "./style.css";

const Index = (props) => {
  return (
    <Fragment>
      <div className="bg-img">
        <Navbar />
        <div className=" pt--90">
          <Switch>
            <Route path="/auth/signup" component={Signup} exact />
            <Route path="/auth/login" component={Login} exact />
            <Route path="/auth/steps" component={Wizard} exact />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
