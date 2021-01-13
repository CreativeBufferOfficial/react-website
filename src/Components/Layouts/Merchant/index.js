import React from "react";
import { Switch, Route } from "react-router-dom";
import Wizard from "../../Pages/Form/Wizard";

const Index = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/merchant/merchant-application" component={Wizard} exact />
      </Switch>
    </div>
  );
};

export default Index;
