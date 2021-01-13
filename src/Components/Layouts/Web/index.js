import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import purifyDOM from "dompurify";

import Navbar from "../Header/index";
import Footer from "../Footer/index";

import Home from "../../Pages/Home/index";
import Transaction from "../../Pages/Transaction/index";
import About from "../../Pages/About/index";
import Affiliate from "../../Pages/Affiliate/index";
import Contact from "../../Pages/Contact/index";
import ApiDocumentation from "../../Pages/Documentation/index";
import Wizard from "../../Pages/Form/Wizard";

import COOKIE_HTML from "../../../static/policies/cookie-policy.html"
import DISCLAIMER_HTML from "../../../static/policies/disclaimer.html"
import PRIVACY_HTML from "../../../static/policies/privacy-policy.html"
import TERMS_AND_CONDITONS_HTML from "../../../static/policies/terms-and-conditions.html"
import RETURN_AND_REFUND_HTML from "../../../static/policies/return-and-refund-policy.html"


import "../styles.css";
import queryString from "query-string";


class PaymentSummaryComponent extends React.Component {
  componentDidMount() {
    let url = window.location.href;
    if (url.indexOf('uuid') > -1) {
      let uuid = queryString.parse(url.substr(url.indexOf('uuid'))).uuid;
      console.log('uuid: ', uuid);
      localStorage.setItem('uuid', uuid);
    }
    window.location.href = "/?kyc=true";
  }
  render() {
    return (
      <div></div>
    )
  }
}

const Index = (props) => {
  return (
    <Fragment>
      <Route exact path="/payment/summary" component={PaymentSummaryComponent} />
      {window.location.href.indexOf('/payment/summary') > -1 ||
        window.location.href.includes("/static/policies/privacy") ||
        window.location.href.includes("/static/policies/terms-and-conditions") ||
        window.location.href.includes("/static/policies/cookie-policy") ||
        window.location.href.includes("/static/policies/return-and-refund-policy") ||
        window.location.href.includes("/static/policies/disclaimer")
        ? (
          <div></div>
        ) : (<Navbar />)}
      {/* {console.log("WINDOW HREF====", window.location.href.includes("/static/policies/privacy-policy.html"))} */}
      {/* window.location.href.indexOf("/static/policies/privacy") === 21 ? <div></div> : <Navbar />} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/static/policies/privacy-policy.html"
          render={() => <div style={{ padding: "3rem" }}
            dangerouslySetInnerHTML={{ __html: purifyDOM.sanitize(PRIVACY_HTML) }} />}
        />

        <Route exact path="/static/policies/terms-and-conditions.html"
          render={() => <div style={{ padding: "3rem" }}
            dangerouslySetInnerHTML={{ __html: purifyDOM.sanitize(TERMS_AND_CONDITONS_HTML) }} />}
        />

        <Route exact path="/static/policies/cookie-policy.html"
          render={() => <div style={{ padding: "3rem" }}
            dangerouslySetInnerHTML={{ __html: purifyDOM.sanitize(COOKIE_HTML) }} />}
        />

        <Route exact path="/static/policies/return-and-refund-policy.html"
          render={() => <div style={{ padding: "3rem" }}
            dangerouslySetInnerHTML={{ __html: purifyDOM.sanitize(RETURN_AND_REFUND_HTML) }} />}
        />

        <Route exact path="/static/policies/disclaimer.html"
          render={() => <div style={{ padding: "3rem" }}
            dangerouslySetInnerHTML={{ __html: purifyDOM.sanitize(DISCLAIMER_HTML) }} />}
        />

        {/* <Route path="/:request-uuid" component={Home} /> */}
        <Route exact path="/transaction-status" component={Transaction} />
        <Route exact path="/about" component={About} />
        <Route exact path="/affiliate" component={Affiliate} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/api-documentation" component={ApiDocumentation} />


      </Switch>
      {window.location.href.indexOf('/payment/summary') > -1 ||
        window.location.href.includes("/static/policies/privacy-policy") ||
        window.location.href.includes("/static/policies/terms-and-conditions") ||
        window.location.href.includes("/static/policies/cookie-policy") ||
        window.location.href.includes("/static/policies/return-and-refund-policy") ||
        window.location.href.includes("/static/policies/disclaimer")
        ? (
          <div></div>
        ) : (<Footer />)}

    </Fragment>
  );
};

export default Index;
