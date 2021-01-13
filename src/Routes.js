import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthLayout from "./Components/Layouts/Auth/index";
import WebLayout from "./Components/Layouts/Web/index";
import MerchantLayout from "./Components/Layouts/Merchant/index";
import "./Components/Pages/Form/style.css";
export default function Router() {
  return (
    <div>
      <Route path="/auth" render={(props) => <AuthLayout {...props} exact />} />

      <Route render={(props) => <WebLayout {...props} />} />
      <Route render={(props) => <MerchantLayout {...props} exact />} />
    </div>
  );
}
