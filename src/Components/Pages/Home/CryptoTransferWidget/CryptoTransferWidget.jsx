import React, { Component } from "react";
import ReactDOM from "react-dom";
import renderHTML from "react-render-html";
import { Base64 } from "js-base64";
// react component that creates a form divided into multiple steps
import StepZilla from "react-stepzilla";
import { useParams, NavLink } from "react-router-dom";
import history from "../../../../@history";
import publicIp from "public-ip";
import { Container, Row, Col, FormGroup, FormControl, FormLabel, Tooltip, OverlayTrigger, Button, Form } from "react-bootstrap";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./CryptoTransferWidget.css";
import cx from "classnames";
import moment from "moment";

import PropTypes from "prop-types";

import Select from "react-select";

// import Recaptcha from "react-recaptcha";
// import ReCAPTCHA from "react-google-recaptcha";
import { v4 as uuidv4 } from "uuid";

import Loader from "../../../Layouts/Loader/Loader";
import walletValidator from "wallet-address-validator";
import HeaderLogo from "./header-logo.svg";
import { countryList } from "../../../../config/shared";
import {
  customCheck,
  getQuote,
  createQuote,
  sendEmail,
  getIpLocationInfo,
  postUserKyc,
  postSubmitUserKyc,
  getPaymentDetailsForUUID,
  getTransferDetailsForRequestUUID,
  postPayment,
  getCheckEnrolledCard,
  userAuth,
  updateToken,
  sendTransactionEmail,
} from "../../../../common/apiService";
import queryString from "query-string";
import config from "../../../../config/config";
const validateEth = (address) => {
  return walletValidator.validate(address, "ETH");
};

class Card extends Component {
  render() {
    return (
      <div
        className={
          (this.props.hidden ? "card-hidden" : "") +
          (this.props.calendar ? "card-calendar" : "") +
          (this.props.plain ? "card-plain" : "") +
          (this.props.wizard ? "card-wizard" : "") +
          " cryptotransferwidget"
        }
      >
        {this.props.title !== undefined || this.props.category !== undefined ? (
          <div className={"header" + (this.props.textCenter ? " text-center" : "")}>
            <h4 className="title">{this.props.title}</h4>
            <p className="category">{this.props.category}</p>
          </div>
        ) : (
          ""
        )}
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctFullWidth ? " content-full-width" : "") +
            (this.props.ctTextCenter ? " text-center" : "") +
            (this.props.tableFullWidth ? " table-full-width" : "")
          }
        >
          {this.props.content}
        </div>
        {this.props.stats !== undefined || this.props.legend !== undefined ? (
          <div className={"footer" + (this.props.ftTextCenter ? " text-center" : "")}>
            {this.props.legend !== undefined ? <div className="legend">{this.props.legend}</div> : null}
            {this.props.stats !== undefined ? <hr /> : null}
            {this.props.stats !== undefined ? <div className="stats">{this.props.stats}</div> : null}
          </div>
        ) : null}
      </div>
    );
  }
}

class CustomButton extends Component {
  render() {
    const {
      fill,
      simple,
      pullRight,
      block,
      wd,
      round,
      icon,
      neutral,
      twitter,
      facebook,
      google,
      linkedin,
      pinterest,
      youtube,
      tumblr,
      github,
      behance,
      dribbble,
      reddit,
      stumbleupon,
      ...rest
    } = this.props;

    const btnClasses = cx({
      "btn-fill": fill,
      "btn-simple": simple,
      "pull-right": pullRight,
      "btn-block": block,
      "btn-wd": wd,
      "btn-round": round,
      "btn-icon": icon,
      "btn-neutral": neutral,
      "btn-social btn-twitter": twitter,
      "btn-social btn-facebook": facebook,
      "btn-social btn-google": google,
      "btn-social btn-linkedin": linkedin,
      "btn-social btn-pinterest": pinterest,
      "btn-social btn-youtube": youtube,
      "btn-social btn-tumblr": tumblr,
      "btn-social btn-github": github,
      "btn-social btn-behance": behance,
      "btn-social btn-dribbble": dribbble,
      "btn-social btn-reddit": reddit,
      "btn-social btn-stumbleupon": stumbleupon,
    });

    return <Button className={btnClasses} {...rest} />;
  }
}

CustomButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  wd: PropTypes.bool,
  round: PropTypes.bool,
  icon: PropTypes.bool,
  neutral: PropTypes.bool,
  twitter: PropTypes.bool,
  facebook: PropTypes.bool,
  google: PropTypes.bool,
  linkedin: PropTypes.bool,
  pinterest: PropTypes.bool,
  youtube: PropTypes.bool,
  tumblr: PropTypes.bool,
  github: PropTypes.bool,
  behance: PropTypes.bool,
  dribbble: PropTypes.bool,
  reddit: PropTypes.bool,
  stumbleupon: PropTypes.bool,
};

class Step1 extends React.Component {
  state = {
    controls: {
      current_token: {
        value: null,
        details: null,
      },
      email: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
          email: true,
        },
        error: null,
      },
      wallet_address: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
          custom: [validateEth],
        },
        error: null,
      },
      amount_to_receive: {
        value: "",
        valid: true,
        touched: false,
        error: null,
      },
      amount_to_purchase: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
          minValue: 1,
        },
        locationInfo: null,
        error: null,
      },
    },
    // email: "",
    // wallet_address: "",
    // amount_to_receive: "",
    drop_down_selected: false,
    emailError: null,
    captchaVerified: false,
    dropdownVisible: false,
    // current_token: "Select token",
    // current_token: null,
    loading: false,
    intervalRef: null,
    error: null,
    ipAddress: null,
    request_uuid: "",
  };

  /*
  isValidated = () => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {
      email,
      wallet_address,
      amount_to_receive,
      drop_down_selected,
      captchaVerified,
    } = this.state;
    var errorOccured = true;

    if (email.trim().length > 0) {
      const emailValidated = re.test(email);
      errorOccured = !emailValidated;
    } else {
      errorOccured = true;
      this.setState({
        emailError: (
          <span className="text-danger">
            You need to specify an valid email
          </span>
        ),
      });
    }

    if (wallet_address.trim().length == 0) {
      errorOccured = true;
      this.setState({
        walletAddressError: (
          <span className="text-danger">
            You need to specify an wallet address
          </span>
        ),
      });
      // }

      // if (amount_to_receive.trim().length == 0) {
      //   errorOccured = true;
      //   this.setState({
      //     amountToReceiveError: (
      //       <span className="text-danger">
      //         You need to specify an amount to receive
      //       </span>
      //     ),
      //   });
    }

    if (!drop_down_selected) {
      errorOccured = true;
      this.setState({
        dropDownErorr: <p className="text-danger">Please Select a Token</p>,
      });
    }

    if (!captchaVerified) {
      errorOccured = true;
      this.setState({
        captchaError: <span className="text-danger">Verify Captcha</span>,
      });
    }
    return true;
  };
  */

  componentDidMount() {
    // fetch("http://api.ipstack.com/39.33.200.221?access_key=6beecd37287531884502001e0016a2be&format=1")
    // .then(response=>response.json())
    // .then(response=>console.log(response))
    // .catch(e=>console.error(e));

    console.log(this.state);
    console.log(localStorage.getItem("newToken"));
    if (new Date().getTime() > parseInt(localStorage.getItem("sessionExpiration"), 10) && localStorage.getItem("newToken")) {
      localStorage.removeItem("newToken");
      console.log("session Expired");
    } else {
      console.log("Session Valid");
    }

    if (!localStorage.getItem("newToken")) {
      userAuth(config.XPortUser, config.XPortPassword).then((response) => {
        // console.log(response);
        if (response.authenticated) {
          console.log("User authenticated");
          updateToken(response.token);
          localStorage.setItem("sessionExpiration", new Date(new Date().getTime() + 60 * 60 * 24 * 1000).getTime().toString());
        } else {
          window.alert("user not authenticated");
        }
      });
    } else {
      updateToken(localStorage.getItem("newToken"));
    }

    let redLocation = window.location.href;
    if (
      (redLocation.indexOf("kyc=true") > -1 || redLocation.indexOf("/payment/summary") > -1) &&
      localStorage.getItem("uuid") &&
      localStorage.getItem("kyc")
    ) {
      this.setState({ request_uuid: localStorage.getItem("uuid") }, () => {
        console.log("kyc parameter uuid >>>>", this.state.request_uuid);
        this.props.setStepState(2, {
          uuid: this.state.request_uuid,
        });
        this.props.jumpToStep(2);
      });
    } else {
      localStorage.removeItem("uuid");
      localStorage.removeItem("kyc");
    }
    let req__id = queryString.parse(redLocation.substring(redLocation.indexOf("uuid")));
    console.log(req__id);
    if (req__id.uuid && req__id.uuid.length > 0 && localStorage.getItem("paymentRequest") !== "completed") {
      this.setState({ request_uuid: req__id.uuid }, () => {
        getPaymentDetailsForUUID(req__id.uuid).then((response) => {
          console.log(response);
          localStorage.setItem("paymentRequest", "completed");
          if (response.error && response.code === 400) {
            this.setState({ loading: false });
            alert("Session Expired");
            localStorage.clear();
            this.props.jumpToStep(0);
          } else if (response.error) {
            this.setState({ loading: false });
            console.log(response);
            return;
          }
          if (response.transactionStatus === "APPROVED") {
            this.props.setStepState(this.props.stepIndex, {
              controls: response,
              uuid: this.state.request_uuid,
            });
            this.props.jumpToStep(3);
          } else if (response.transactionStatus === "DECLINED") {
            this.props.setStepState(this.props.stepIndex, {
              controls: response,
              uuid: this.state.request_uuid,
            });
            this.props.jumpToStep(3);
          }
        });
      });
    }

    if (this.props.stepState) {
      this.setState(
        {
          ...this.props.stepState,
        },
        () => {
          this.getPriceQuote(this.state.controls["current_token"].value.label);
          const intervalRef = setInterval(() => {
            this.getPriceQuote(this.state.controls["current_token"].value.label);
          }, 5000);

          this.setState({
            intervalRef: intervalRef,
          });
        }
      );
    }
  }

  verifyCallback = (response) => {
    console.log("callback called", response);
    this.setState({
      captchaVerified: true,
    });
  };

  onLoadCallback = function () {
    console.log("callback called");
  };

  handleChange = (e) => {
    const controls = { ...this.state["controls"] };
    const control = { ...controls[e.target.name] };
    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateField(control);
    controls[e.target.name] = control;
    if (e.target.name == "amount_to_purchase") {
      if (!this.state.controls.current_token.details || !control.value) {
        controls["amount_to_receive"].value = "";
      } else {
        controls["amount_to_receive"].value = (e.target.value / this.state.controls.current_token.details.result.askPrice).toFixed(4);
      }
    }
    this.setState({
      controls: controls,
    });
  };

  validateField = (control) => {
    const value = control.value;
    let isValid = true;
    const validations = control.validations;
    if (!validations) return true;
    if (validations.required) {
      isValid = isValid && !!value;
    }
    if (validations.email) {
      isValid = isValid && /.+\@.+\..+/.test(value);
    }
    if (validations.minValue) {
      isValid = isValid && !isNaN(value) && value >= validations.minValue;
    }
    if (validations.custom && validations.custom.length > 0) {
      validations.custom.forEach((customValidator) => {
        isValid = isValid && customValidator(value);
      });
    }
    return isValid;
  };

  toggleDropdown = () => {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible,
    });
  };

  getPriceQuote = (token) => {
    console.log(token);
    getQuote(token)
      .then((response) => {
        const controls = { ...this.state.controls };
        controls["current_token"].details = response;
        controls["current_token"].valid = true;
        if (!controls["amount_to_purchase"].value) {
          controls["amount_to_receive"].value = "";
        } else {
          controls["amount_to_receive"].value = (controls["amount_to_purchase"].value / controls["current_token"].details.result.askPrice).toFixed(4);
        }
        this.setState({
          controls: controls,
          drop_down_selected: true,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  setToken = (token) => {
    const controls = { ...this.state.controls };
    controls["current_token"].value = token;
    controls["current_token"].valid = false;
    controls["current_token"].touched = true;

    if (this.state.intervalRef) {
      clearInterval(this.state.intervalRef);
    }

    if (!token) return;
    this.setState({
      loading: true,
    });

    getQuote(token.label)
      .then((response) => {
        controls["current_token"].details = response;
        controls["current_token"].valid = true;
        if (!controls["amount_to_purchase"].value) {
          controls["amount_to_receive"].value = "";
        } else {
          controls["amount_to_receive"].value = (controls["amount_to_purchase"].value / controls["current_token"].details.result.askPrice).toFixed(4);
        }

        const intervalRef = setInterval(() => this.getPriceQuote(token.label), 5000);
        this.setState({
          controls: controls,
          drop_down_selected: true,
          loading: false,
          intervalRef: intervalRef,
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState({ loading: false });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // this.props.setStepState(this.props.stepIndex , {controls:this.state.controls });
    // clearInterval(this.state.intervalRef);
    // this.props.jumpToStep(1);

    const uuid = uuidv4();
    // const company_uuid = uuidv4();

    const body = {
      requestUUID: uuid,
      email: this.state.controls.email.value,
      amount: this.state.controls.amount_to_purchase.value,
      walletAddress: this.state.controls.wallet_address.value,
      company_uuid: config.CompanyUuid,
    };
    console.log(body);
    this.setState({ loading: true });
    createQuote(body)
      .then((response) => {
        // clearInterval(this.state.intervalRef);
        console.log(response);
        // return;
        let tempUUID = response.result.requestUUID;
        let companyUUID = response.result.companyUUID;
        postUserKyc(this.state.controls.email.value)
          .then((response) => {
            if (response.error && response.code === 400) {
              this.setState({ loading: false });
              alert("Session Expired");
              localStorage.clear();
              this.props.jumpToStep(0);
            } else if (response.error) {
              this.setState({ loading: false });
              console.log(response);
              return;
            }
            console.log(response, "kyc response is here ", response.data.records, " ", response.data.records.length);
            if (response.data.records.length == 0) {
              localStorage.setItem("uuid", tempUUID);
              console.log("inside if, company UUID" + companyUUID);
              this.props.setStepState(this.props.stepIndex, {
                controls: this.state.controls,
                uuid: tempUUID,
                company_uuid: companyUUID,
              });
              this.setState({ loading: false });
              this.props.jumpToStep(1);
            } else {
              if (response.data.records[0].status == "approved" || response.data.records[0].status == "pending") {
                this.props.setStepState(this.props.stepIndex, {
                  controls: this.state.controls,
                  uuid: uuid,
                });
                console.log("inside else");
                this.setState({ loading: false });
                this.props.jumpToStep(2);
              } else {
                this.setState({ loading: false });
                alert("Kyc not verified");
              }
            }
          })
          .catch((error) => {
            console.log(typeof error);
            console.error(error.message);
            console.log("inside post kyc error ", JSON.stringify(error), typeof error);
            this.setState({
              error: error.message,
              loading: false,
            });

            setTimeout(
              () =>
                this.setState({
                  error: null,
                }),
              2000
            );
          });
        /*
      const sendEmailBody =  { 
        receiver: this.state.controls.email.value,
        subject: "USER CONFIRMATION",
        type: "USER_CONFIRM",
      object: {
          email: this.state.controls.email.value, 
          name: "XPORT DIGITAL", //hardcode
          datetime: new Date(), //systemdate
          ip: this.state.ipAddress,
          location: this.state.locationInfo.city 
      }
    }

    */

        // sendEmail(sendEmailBody).then(res=>{
        //    this.props.setStepState(this.props.stepIndex , {controls:this.state.controls });
        //   this.props.jumpToStep(1);
        //   clearInterval(this.intervalRef);
        // }).catch(error=>{
        //   if(error.message =="Unexpected end of input"){
        //     this.props.setStepState(this.props.stepIndex , {controls:this.state.controls });
        //     this.props.jumpToStep(1);
        //     clearInterval(this.intervalRef);
        //   }
        //   else {
        //     this.setState({
        //       error: error.message
        //     });
        //   }
        // })
        // this.setState({
        //   nextButtonText: "Pay Now",
        //   backButtonText: "Back",
        // });
      })
      .catch((error) => {
        console.log("inside error");
        console.log(error.message);
        if (error.message == "Initial Transaction Pending.") {
          postUserKyc(this.state.controls.email.value)
            .then((response) => {
              if (response.error && response.code === 400) {
                this.setState({ loading: false });
                alert("Session Expired");
                localStorage.clear();
                this.props.jumpToStep(0);
              } else if (response.error) {
                this.setState({ loading: false });
                console.log(response);
                return;
              }
              console.log("response is here ", response);
              if (response.data.records == 0) {
                this.setState({ loading: false });
                alert("No KYC Data Found");
                this.props.setStepState(this.props.stepIndex, {
                  controls: this.state.controls,
                });
              } else {
                if (response.data.records[0].status == "approved" || response.data.records[0].status == "pending") {
                  this.props.setStepState(this.props.stepIndex, {
                    controls: this.state.controls,
                    uuid: uuid,
                    company_uuid: response.data.records[0].company_uuid,
                  });
                  console.log("inside else");
                  this.setState({ loading: false });
                  this.props.jumpToStep(2);
                } else {
                  this.setState({ loading: false });
                  alert("Kyc not verified");
                }
              }
            })
            .catch((error) => {
              this.setState({ loading: false });
              console.error(error);
            });
        } else {
          this.setState({ loading: false });
        }
        // this.setState({
        //   error: error.message
        // });

        setTimeout(() => this.setState({ error: null }), 6000);
        console.error(error);
      });
  };

  captchaExpired = () => {
    this.setState({
      captchaVerified: false,
    });
  };

  isFormValid = () => {
    let isValid = true;
    for (const control in this.state.controls) {
      isValid = isValid && this.state.controls[control].valid;
    }
    // isValid = isValid && this.state.captchaVerified;
    return isValid;
  };

  render() {
    const { dropdownVisible, current_token, controls, ipAddress, locationInfo } = this.state;
    console.log(controls, " ", this.props.stepState, " ", ipAddress, " ", locationInfo, " ", this.props);
    return (
      <div className="wizard-step text-left">
        <Form onSubmit={this.handleSubmit}>
          <Row style={{ opacity: 0 }}>
            <Col md={6}>13</Col>
            <Col md={6}>13</Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  Select Token<span className="text-danger">*</span>
                </FormLabel>
                <Select
                  name="current_token"
                  value={controls.current_token.value}
                  options={[
                    { value: 1, label: "USDT" },
                    { value: 2, label: "BTC" },
                    { value: 3, label: "ETH" },
                  ]}
                  className="selectToken"
                  onChange={(value) => {
                    this.setToken(value);
                  }}
                />
                {this.state.controls.current_token.details && (
                  <p
                    style={{
                      textAlign: "left",
                      marginTop: 2,
                      fontSize: 12,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Price:{" "}
                    {this.state.controls.current_token.details.result.askPrice < 1 &&
                    this.state.controls.current_token.details.result.symbol === "USDT-USD"
                      ? Math.floor(this.state.controls.current_token.details.result.askPrice)
                      : parseInt(this.state.controls.current_token.details.result.askPrice).toFixed(2)}
                  </p>
                )}
                {this.state.dropDownErorr}
              </FormGroup>
            </Col>
            <Col md={6} mdOffset={1}>
              <FormGroup>
                <OverlayTrigger
                  overlay={
                    <Tooltip placement="right" id="wallet-tooltip">
                      Wallet address must belong to you.
                    </Tooltip>
                  }
                  placement="right"
                >
                  <FormLabel>
                    Wallet Address<span className="text-danger">*</span>
                  </FormLabel>
                </OverlayTrigger>
                <FormControl
                  type="text"
                  name="wallet_address"
                  placeholder="wallet-address"
                  value={controls["wallet_address"].value}
                  onChange={this.handleChange}
                />
                <small className="form-text text-muted " style={{ fontWeight: 400 }}>
                  Format: 0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
                </small>
              </FormGroup>
              {this.state.walletAddressError}
            </Col>
          </Row>

          <Row>
            <Col md={6} mdOffset={1}>
              <FormGroup>
                <FormLabel>
                  Amount to purchase<span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  value={controls.amount_to_purchase.value}
                  type="number"
                  name="amount_to_purchase"
                  placeholder="0.00"
                  onChange={this.handleChange}
                />
                {this.state.amountToReceiveError}
              </FormGroup>
            </Col>
            <Col md={6} mdOffset={1}>
              <FormGroup>
                <FormLabel>
                  Email <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={controls.email.value}
                  placeholder="ex: user@email.com"
                  onChange={this.handleChange}
                />
                {this.state.emailError}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} mdOffset={1}>
              <FormGroup>
                <FormLabel>Amount you will receive</FormLabel>
                <FormControl
                  type="number"
                  name="amount_to_receive"
                  placeholder="0.00"
                  value={parseInt(controls.amount_to_receive.value).toFixed(2)}
                  disabled
                  onChange={this.handleChange}
                />
                {this.state.amountToReceiveError}
              </FormGroup>
            </Col>
            <Col md={6} mdOffset={1} style={{ paddingTop: "27px" }}>
              {/* // sitekey="6LduluAZAAAAAKCPy4Crt7nt1ETYNicFFYKIB6yX" */}
              {/* <ReCAPTCHA
                sitekey="6LdHAOQZAAAAAFmPE4QuQaH_M2TOw1CR78OrAb47"
                 onChange={this.verifyCallback}
                 onExpired = {this.captchaExpired}
                 onErrored={(error)=>console.log(error)}
               /> */}

              {/* <Recaptcha
                render="explicit"
                sitekey="6LdHAOQZAAAAAFmPE4QuQaH_M2TOw1CR78OrAb47"
                verifyCallback={this.verifyCallback}
                expiredCallback={this.captchaExpired} */}

              {/* /> */}
              {/* {this.state.captchaError} */}
            </Col>
          </Row>
          {this.state.error && <div style={{ marginTop: 8, fontWeight: 500 }} className="alert alert-danger" role="alert"></div>}

          {/* { this.state.error && <div style={{marginTop:8, fontWeight: 500}} className="alert alert-danger" role="alert"> */}
          {/* {this.state.error}    */}
          {/* </div>   */}
          {/* } */}

          <div className="footer-items w-100 mt-5">
            <div className="copyright-container">
              <img src={HeaderLogo} className="copyright-logo" alt="Logo" style={{ marginRight: 20 }} />
              <h6>© Xport Digital. All rights reserved</h6>
            </div>
            {/* <button className="btn btn-prev  btn-fill pull-right btn-wd">Previous</button> */}
            <button disabled={!this.isFormValid() || this.state.error} className="btn  btn-primary pull-right btn-wd">
              Next
            </button>
          </div>
        </Form>

        {this.state.loading && (
          <div className="spinner-container">
            <div className="spinner">
              {/* <Spinner animation="border" role="status" variant="light">
                       <span className="sr-only">Loading...</span>
                 </Spinner> */}
              <Loader />
              {/* <img src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif" />  */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

class KYC extends Component {
  state = {
    companyName: "",
    controls: {
      firstName: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
      lastName: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
      email: {
        value: "",
        valid: true,
      },
      address1: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
      address2: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
      cpc: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
      st: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
      postalCode: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
          patterns: [/^(\d+-?)+\d+$/],
        },
        error: null,
      },
      country: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
    },
    // email: "",
    // wallet_address: "",
    // amount_to_receive: "",
    loading: false,
    error: null,
    modal: false,
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.email) {
      const controls = { ...this.state.controls };
      const emailControl = { ...controls["email"] };
      emailControl.value = this.props.email;
      controls["email"] = emailControl;
      this.setState({
        controls: controls,
        uuid: this.props.uuid,
        companyName: this.props.uuid,
      });
    }
  }

  isValidated() {
    return true;
  }

  handleChange = (e) => {
    const controls = { ...this.state["controls"] };
    const control = { ...controls[e.target.name] };
    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateField(control);
    controls[e.target.name] = control;
    console.log(controls[e.target.name]);
    console.log(controls);
    this.setState({
      controls: controls,
    });
  };

  handleChangeCountry = (event) => {
    const value = event.value;
    const controls = { ...this.state["controls"] };
    const control = { ...controls["country"] };
    control.valid = true;
    control.value = event;
    control.touched = true;
    controls["country"] = control;
    console.log(controls);
    this.setState({
      controls: controls,
    });
  };

  validateField = (control) => {
    const value = control.value;
    let isValid = true;
    const validations = control.validations;
    if (!validations) return true;
    if (validations.required) {
      isValid = isValid && !!value;
    }
    if (validations.email) {
      isValid = isValid && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
    }
    if (validations.minValue) {
      isValid = isValid && !isNaN(value) && value >= validations.minValue;
    }
    if (validations.date) {
      console.log(new Date(value), " date ");
      isValid = isValid && new Date(value) !== "Invalid Date" && !isNaN(new Date(value));
    }
    if (validations.minLength) {
      // ^\d+(?:-\d+)*$
      isValid = isValid && value.length >= validations.minLength;
    }
    if (validations.length) {
      isValid = isValid && value.length == validations.length;
    }
    if (validations.patterns) {
      validations.patterns.forEach((pattern) => {
        isValid = isValid && pattern.test(value);
      });
    }

    if (validations.custom && validations.custom.length > 0) {
      validations.custom.forEach((customValidator) => {
        isValid = isValid && customValidator(value);
      });
    }
    return isValid;
  };

  isFormValid = () => {
    let isValid = true;
    for (const control in this.state.controls) {
      isValid = isValid && this.state.controls[control].valid;
    }
    return isValid;
  };

  handleSubmitKYC = (event) => {
    event.preventDefault();
    const { controls, uuid, companyName } = this.state;
    console.log(companyName);
    console.log("kyc submitted ", this.state.controls);
    console.log(localStorage.getItem("uuid"));
    // localStorage.setItem('uuid',uuid);
    // return;
    const body = {
      firstName: controls.firstName.value,
      lastName: controls.lastName.value,
      email: controls.email.value,
      companyName: companyName,
      address1: controls.address1.value,
      address2: controls.address2.value,
      CPC: controls.cpc.value,
      ST: controls.st.value,
      postalCode: controls.postalCode.value,
      country: controls.country.value.value,
    };
    console.log("body KYC", body);
    this.setState({ loading: true });
    postSubmitUserKyc(body)
      .then((response) => {
        if (response.error && response.code === 400) {
          this.setState({ loading: false });
          alert("Session Expired");
          localStorage.clear();
          this.props.jumpToStep(0);
        } else if (response.error) {
          this.setState({ loading: false });
          console.log(response);
          return;
        }
        console.log(response);
        this.setState({ loading: false });
        console.log(localStorage.getItem("uuid"));
        // this.setState({modal: true});

        localStorage.setItem("kycVerification", response.data.url);
        document.getElementById("modalTrigger").click();

        // if(window.confirm(`Do you want to Verify now?`)){

        // }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.error(error);
      });
  };
  handlePopup = () => {
    localStorage.setItem("kyc", "true");
    window.location.href = localStorage.getItem("kycVerification");
  };
  render() {
    console.log(this.state.controls);

    return (
      <div className="wizard-step text-left">
        <Form onSubmit={this.handleSubmitKYC}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  First Name<span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={this.state.controls.firstName.value}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  Last Name<span className="text-danger">*</span>
                </FormLabel>
                <FormControl type="text" name="lastName" placeholder="Doe" value={this.state.controls.lastName.value} onChange={this.handleChange} />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  Email<span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  style={{ backgroundColor: "#edeaea" }}
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={this.state.controls.email.value}
                  disabled
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  Address 1<span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="address1"
                  placeholder="123 Main St"
                  value={this.state.controls.address1.value}
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  Address 2<span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="address2"
                  placeholder="5G"
                  value={this.state.controls.address2.value}
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  CPC<span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="cpc"
                  placeholder="NYC"
                  value={this.state.controls.cpc.value}
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  St.<span className="text-danger">*</span>
                </FormLabel>
                <FormControl type="text" name="st" placeholder="NY" value={this.state.controls.st.value} onChange={this.handleChange} />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  Postal Code<span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="postalCode"
                  placeholder="11201"
                  value={this.state.controls.postalCode.value}
                  onChange={this.handleChange}
                />
                <small className="form-text text-muted " style={{ fontWeight: 400 }}>
                  Numeric postal code with/without dashes (898343 , 444-555)
                </small>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <FormLabel>
                  Country<span className="text-danger">*</span>
                </FormLabel>
                <Select
                  name="country"
                  value={this.state.controls.country.value}
                  options={countryList.map((country) => ({
                    value: country,
                    label: country,
                  }))}
                  onChange={this.handleChangeCountry}
                />
              </FormGroup>
            </Col>
          </Row>
          {this.state.loading && (
            <div className="spinner-container">
              <div className="spinner">
                {/* <Spinner animation="border" role="status" variant="light">
                       <span className="sr-only">Loading...</span>
                 </Spinner> */}
                <Loader />
                {/* <img src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif" />  */}
              </div>
            </div>
          )}
          <div className="footer-items w-100 mt-5">
            <div className="copyright-container">
              <img src={HeaderLogo} className="copyright-logo" alt="Logo" style={{ marginRight: 20 }} />
              <h6>© Xport Digital. All rights reserved</h6>
            </div>
            <button type="button" onClick={() => this.props.jumpToStep(0)} className="btn btn-prev  btn-fill pull-right btn-wd d-none">
              Previous
            </button>
            <button type="submit" disabled={!this.isFormValid() || this.state.error} className="btn  btn-primary pull-right btn-wd">
              Next
            </button>
          </div>
        </Form>

        <Popup
          trigger={
            <button className="btn btn-default btn-prev" style={{ display: "none" }} id="modalTrigger">
              {" "}
              Open Modal{" "}
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="modal1">
              {/* <button className="close" onClick={close}>
                     &times;
                   </button> */}
              <div className="header heading-transaction" style={{ paddingBottom: "15px" }}>
                You will be redirected to Fully Verified for KYC
              </div>

              <div className="actions" style={{ paddingTop: "50px" }}>
                <button className="btn btn-default" style={{ borderRadius: "4px" }} onClick={this.handlePopup}>
                  {" "}
                  Proceed{" "}
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-default"
                  style={{ borderRadius: "4px" }}
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                    this.props.jumpToStep(0);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}

class Step2 extends React.Component {
  state = {
    kyc_approved: null,
    transaction_summary: null,
    controls: {
      firstName: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
      lastName: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
        },
        error: null,
      },
      cardNumber: {
        value: "",
        valid: false,
        touched: false,
        error: null,
        validations: {
          required: true,
          minLength: 10,
        },
      },
      expiryDate: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
          date: true,
        },
        error: null,
      },
      cvv: {
        value: "",
        valid: false,
        touched: false,
        validations: {
          required: true,
          length: 3,
        },
        error: null,
      },
    },
    loading: false,
    error: null,
    htmlScript: "",
    ipAddress: "127.0.0.1",
  };

  componentDidMount() {
    publicIp.v4().then((ip) => {
      this.setState({ ipAddress: ip });
    });

    const uuid = this.props.uuid;
    console.log(uuid, " ", this.props);
    getTransferDetailsForRequestUUID(uuid, config.CompanyUuid)
      .then((response) => {
        if (response.error && response.code === 400) {
          this.setState({ loading: false });
          alert("Session Expired");
          localStorage.clear();
          this.props.jumpToStep(0);
        } else if (response.error) {
          this.setState({ loading: false });
          console.log(response);
          return;
        }
        const data = response.result;
        console.log(data);
        const transactionSummary = {
          token: data.quoteCurrency,
          totalCharge: data.finalPrice,
          totalToRecieve: data.quotePrice,
          tx: data.markupFee,
          wallet: data.wallet,
          ...data,
        };
        console.log(transactionSummary);

        postUserKyc(data.email).then((res) => {
          if (res.error && response.code === 400) {
            alert("Session Expired");
            localStorage.clear();
            this.props.jumpToStep(0);
          } else if (res.error) {
            console.log(response);
            return;
          }
          console.log(res);
          const kycData = res.data.records;
          let kycStatus;
          if (kycData.length == 0) {
            kycStatus = "UNAVAILABLE";
          } else {
            if (kycData[0].status == "approved") {
              kycStatus = "APPROVED";
            } else if (kycData[0].status == "pending") {
              kycStatus = "PENDING";
            } else {
              kycStatus = "UNAVAILABLE";
            }
          }
          this.setState({
            transaction_summary: transactionSummary,
            kyc_approved: kycStatus,
          });
        });
      })
      .catch((error) => console.error(error));
  }

  isValidated() {}

  onClickStepBack = () => {
    this.props.jumpToStep(0);
  };

  handleChange = (e) => {
    // console.log("handleChangeCallec ", e);
    const controls = { ...this.state["controls"] };
    const control = { ...controls[e.target.name] };
    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateField(control);
    controls[e.target.name] = control;
    if (controls["expiryDate"].value) {
      if (new Date(controls["expiryDate"].value) < new Date()) controls["expiryDate"].valid = false;
      //   if (/(^[0-9]{2})+$/.test(controls["expiryDate"].value)) {
      //     controls["expiryDate"].value = controls["expiryDate"].value.toString() + "/";
      //   } else {
      //     if (/^[0-9]{2}\/[0-9]{2}$/.test(controls["expiryDate"].value)) {
      //       const date = controls["expiryDate"].value.split("/");
      //       if (date.shift() > 12 || date.shift() < 0 || date.pop() > 31 || date.pop() <= 0) {
      //         controls["expiryDate"].valid = false;
      //       } else {
      //         controls["expiryDate"].valid = true;
      //       }
      //     } else {
      //       controls["expiryDate"].valid = false;
      //     }
      //   }
    }

    // // console.log(controls[e.target.name]);
    // console.log("STATE FORM CONTROLS===", controls);
    this.setState({
      controls: controls,
    });
  };

  validateField = (control) => {
    const value = control.value;
    let isValid = true;
    const validations = control.validations;
    if (!validations) return true;
    if (validations.required) {
      isValid = isValid && !!value;
    }
    if (validations.email) {
      isValid = isValid && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
    }
    if (validations.minValue) {
      isValid = isValid && !isNaN(value) && value >= validations.minValue;
    }
    if (validations.date) {
      // console.log(new Date(value), " date ");
      isValid = isValid && new Date(value) !== "Invalid Date" && !isNaN(new Date(value));
    }
    if (validations.minLength) {
      // ^\d+(?:-\d+)*$
      isValid = isValid && value.length >= validations.minLength;
    }
    if (validations.length) {
      isValid = isValid && value.length == validations.length;
    }

    if (validations.custom && validations.custom.length > 0) {
      validations.custom.forEach((customValidator) => {
        isValid = isValid && customValidator(value);
      });
    }
    return isValid;
  };

  isFormValid = () => {
    let isValid = true;
    for (const control in this.state.controls) {
      isValid = isValid && this.state.controls[control].valid;
    }
    // isValid = this.isValid && this.state.kyc_approved;
    return isValid;
  };

  handleSubmit = () => {
    // event.preventDefault();
    // console.log(this.state);
    const { controls, transaction_summary: transactionSummary } = this.state;
    const expiry = controls.expiryDate.value.split("-")[1] + "/" + controls.expiryDate.value.split("-")[0].substr(2);

    if (
      parseInt(controls.expiryDate.value.split("-")[1]) < new Date().getMonth() + 1 &&
      parseInt(controls.expiryDate.value.split("-")[0].substr(2)) <= parseInt(new Date().getFullYear().toString().substr(2))
    ) {
      alert("Card Expired");
      return;
    }
    const body = {
      // amount: (transactionSummary.originalPurchasedPrice * 100) + (this.cal__Fee().toFixed(2) * 100),
      amount: transactionSummary.originalPurchasedPrice * 100,
      company_uuid: transactionSummary.companyUUID,
      first_name: controls.firstName.value,
      last_name: controls.lastName.value,
      email: transactionSummary.email,
      address_ip: this.state.ipAddress,
      currency: "USD",
      card_number: controls.cardNumber.value,
      expiry_date: expiry,
      cvc2: controls.cvv.value,
      auto_clear: true,
      transaction_status: true,
      request_uuid: this.props.uuid,
      redirect_url: config.RedirectUrl,
      crypto_transfer: true,
      kyc_delayed: true,
      wallet: transactionSummary.wallet,
    };
    // console.log(body);
    this.setState({ loading: true });
    getCheckEnrolledCard(body.card_number)
      .then((response) => {
        if (response.error && response.code === 400) {
          this.setState({ loading: false });
          alert("Session Expired");
          localStorage.clear();
          this.props.jumpToStep(0);
        } else if (response.error) {
          this.setState({ loading: false });
          // console.log(response);
          return;
        }
        if (response.enrolledStatus == "Y") {
          // return postPayment(body)
          postPayment(body).then((paymentResponse) => {
            console.log(paymentResponse);
            if (!paymentResponse.error) {
              localStorage.setItem("paymentRequest", "pending");
              const htmlScriptDecoded = Base64.decode(paymentResponse.formBase64);
              ReactDOM.render(renderHTML(htmlScriptDecoded), document.getElementById("app"));
              console.log("decoded form", htmlScriptDecoded);
              this.setState({ htmlScript: htmlScriptDecoded, loading: false }, () => {
                console.log("<<<<State script>>>", this.state.htmlScript);
              });

              setTimeout(() => {
                document.downloadForm.submit();
              }, 500);
            } else {
              this.setState({ loading: false });
              if (paymentResponse.code === 400) {
                localStorage.removeItem("newToken");
                this.props.jumpToStep(0);
              } else if (paymentResponse.code == 422) {
                this.props.jumpToStep(0);
              }
            }
          });
        } else {
          this.setState({ loading: false });
          alert("This card is not 3DS secure Enrolled, Please use another form of payment");
          // this.props.setStepState(this.props.stepIndex , {
          //   paymentSuccess : false,
          //   paymentError : "3DS Is Not Verified"
          // });
          // this.props.jumpToStep(3);
          // throw new Error("3DS Is Not Verified");
        }
      })
      .then((response) => {
        this.setState({ loading: false });
        this.props.setStepState(this.props.stepIndex, {
          paymentSuccess: true,
          paymentError: null,
        });
        // this.props.jumpToStep(3);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error.message);
        // if(error.message=="Reqeust uuid alread exists."){
        //   this.props.setStepState(this.props.stepIndex  , {
        //      paymentSuccess : true,
        //      paymentError : null
        //   })
        //   this.props.jumpToStep(3);
        // }
      });
  };
  cal__Fee = () => {
    // alert('coming');
    let price = this.state.transaction_summary.originalPurchasedPrice;
    let fee = (price * 3.5) / 100;
    if (fee < 4.99) {
      fee = 4.99;

      return fee;
    } else {
      return fee;
    }
  };
  render() {
    const {
      controls: { firstName, lastName, cardNumber, cvv, expiryDate },
      transaction_summary,
    } = this.state;
    console.log(transaction_summary);
    const statusClasses = ["transaction-details-col"];

    if (this.state.kyc_approved !== null) {
      if (this.state.kyc_approved == "APPROVED") {
        statusClasses.push("green-box");
      } else if (this.state.kyc_approved == "PENDING") {
        statusClasses.push("red-box");
      } else if (this.state.kyc_approved == "UNAVAILABLE") {
        statusClasses.push("gray-box");
      }
    }

    return (
      <div className="wizard-step">
        <Form onSubmit={this.handleSubmit}>
          <Row style={{ opacity: 0 }}>
            <Col md={6}>13</Col>
            <Col md={6}>13</Col>
          </Row>
          <Row>
            <Col md={6} mdOffset={1} style={{ padding: "25px", color: "black" }}>
              <h5 className="text-center heading-transaction">Transaction Summary</h5>
              {this.state.transaction_summary && (
                <div className="transaction-summary">
                  <div className="transaction-details-col">
                    <p>Token </p>
                    <p>{this.state?.transaction_summary?.token}</p>
                    <p>Purchase Amount</p>
                    <p>{this.state?.transaction_summary?.originalPurchasedPrice?.toFixed(2)}</p>
                    <p>TX Fee</p>
                    <p>{this.cal__Fee().toFixed(2)}</p>
                    <p>Amount Charged To Card</p>
                    <p>{(this.state?.transaction_summary?.originalPurchasedPrice + this.cal__Fee()).toFixed(2)}</p>
                    <p>Net Amount Transferred</p>
                    <p>{this.state?.transaction_summary?.quantity?.toFixed(2)}</p>

                    {/* <p>Total to receive</p>
                    <p>{this.state.transaction_summary.totalToRecieve}</p>
                    <p>TX Fee</p>
                    <p>{this.state.transaction_summary.tx} (Markup Fee)</p>
                    <p>Total charge</p>
                    <p>${this.state.transaction_summary.totalCharge}</p> */}
                  </div>
                  <div className="transaction-details-wallet">
                    <p>Wallet address:</p>
                    <p className="wallet-address">{this.state.transaction_summary.wallet}</p>
                  </div>
                </div>
              )}
              {this.state.kyc_approved !== null && (
                <div className={statusClasses.join(" ")}>
                  <p className="kyc-status">KYC Status</p>
                  <p className="kyc-status">
                    {this.state?.kyc_approved?.charAt(0)?.toUpperCase() + this.state?.kyc_approved?.slice(1)?.toLowerCase()}
                  </p>
                </div>
              )}
              <Row style={{ marginTop: "20px" }}></Row>
            </Col>
            <Col md={6} style={{ padding: "25px", textAlign: "left" }}>
              <h5 className="text-center heading-transaction">Card Details</h5>
              <Row>
                <Col md={6} mdOffset={1}>
                  <FormGroup>
                    <FormLabel>
                      First Name <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl type="text" name="firstName" placeholder="First Name" value={firstName.value} onChange={this.handleChange} />
                    {this.state.emailError}
                  </FormGroup>
                </Col>
                <Col md={6} mdOffset={1}>
                  <FormGroup>
                    <FormLabel>
                      Last Name <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl type="text" name="lastName" placeholder="Last Name" value={lastName.value} onChange={this.handleChange} />
                    {this.state.emailError}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <FormLabel>
                      Card Number <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl type="number" name="cardNumber" placeholder="Card Number" value={cardNumber.value} onChange={this.handleChange} />
                    <small className="form-text text-muted " style={{ fontWeight: 400 }}>
                      Minimum Number of 10 digits
                    </small>
                    {this.state.emailError}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} mdOffset={1}>
                  <FormGroup>
                    <FormLabel>
                      Exp Date <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl type="month" name="expiryDate" placeholder="MM/DD" value={expiryDate.value} onChange={this.handleChange} />
                    {this.state.controls.expiryDate.value && !this.state.controls.expiryDate.valid ? (
                      <span style={{ color: "#F62D1E" }}>Invalid date</span>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </Col>
                <Col md={6} mdOffset={1}>
                  <FormGroup>
                    <FormLabel>
                      CVV <span className="text-danger">*</span>
                    </FormLabel>
                    <FormControl
                      type="number"
                      name="cvv"
                      placeholder="CVV"
                      minLength={3}
                      maxLength={3}
                      min={1}
                      value={cvv.value}
                      onChange={this.handleChange}
                    />
                    {this.state.controls.cvv.value && !this.state.controls.cvv.valid ? (
                      <span style={{ color: "#F62D1E" }}>Invalid CVV</span>
                    ) : (
                      <small className="form-text text-muted " style={{ fontWeight: 400 }}>
                        3 digits CVV
                      </small>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        {this.state.loading && (
          <div className="spinner-container">
            <div className="spinner">
              {/* <Spinner animation="border" role="status" variant="light">
                       <span className="sr-only">Loading...</span>
                 </Spinner> */}
              <Loader />
              {/* <img src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif" />  */}
            </div>
          </div>
        )}
        <div id="app" />
        {/* <div dangerouslySetInnerHTML={{__html:this.state.htmlScript}}/> */}
        <div className="footer-items w-100 mt-5">
          <div className="copyright-container">
            <img src={HeaderLogo} className="copyright-logo" alt="Logo" style={{ marginRight: 20 }} />
            <h6>© Xport Digital. All rights reserved</h6>
          </div>
          <div>
            <button onClick={this.onClickStepBack} className="btn btn-default btn-prev" style={{ marginRight: 5 }}>
              Previous
            </button>
            <button
              onClick={() => {
                if (this.isFormValid()) {
                  this.handleSubmit();
                }
              }}
              disabled={!this.isFormValid()}
              type="submit"
              className="btn  btn-primary "
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Step3 extends Component {
  state = {
    alert: null,
    paymentDetails: null,
    transaction_summary: null,
    ipAddress: "",
    locationInfo: {},
    loading: false,
  };

  isValidated() {
    return true;
  }

  componentDidMount() {
    this.setState({ loading: true });
    publicIp
      .v4()
      .then((ip) => {
        return getIpLocationInfo(ip).then((locationInfo) => {
          console.log(locationInfo);
          this.setState({
            ipAddress: ip,
            locationInfo: locationInfo,
          });
          return {
            ipAddress: ip,
            locationInfo: locationInfo,
          };
        });
      })
      .then((location) => {
        console.log("object", location);

        getTransferDetailsForRequestUUID(this.props.uuid, config.CompanyUuid)
          .then((response) => {
            if (response.error && response.code === 400) {
              this.setState({ loading: false });
              alert("Session Expired");
              localStorage.clear();
              this.props.jumpToStep(0);
            } else if (response.error) {
              this.setState({ loading: false });
              console.log(response);
              return;
            }
            const data = response.result;
            console.log(data);
            const transactionSummary = {
              token: data.quoteCurrency,
              totalCharge: data.finalPrice,
              totalToRecieve: data.quotePrice,
              tx: data.markupFee,
              wallet: data.wallet,
              ...data,
            };
            console.log(transactionSummary);
            this.setState(
              {
                transaction_summary: transactionSummary,
              },
              () => {
                // this.setState({ loading: false });
                // send appropriate email
                // change email to transactionSummary.email later
                let subject = "";
                let type = "";
                if (transactionSummary.status === "DECLINED") {
                  subject = "Transaction Rejected";
                  type = "PAYMENT_TRANSFER_REJECTED";
                } else if (transactionSummary.status === "APPROVED") {
                  subject = "Transaction Completed";
                  type = "PAYMENT_TRANSFER_APPROVED";
                } else {
                  subject = "Transaction Pending";
                  type = "TRANSACTION_PENDING";
                }

                let emailBody = {
                  email: transactionSummary.email,
                  datetime: this.convertDate(transactionSummary.updatedAt),
                  ip: location.ipAddress,
                  amount: transactionSummary.quantity.toFixed(2).toString(),
                  fee: this.cal__Fee().toFixed(2).toString(),
                  wallet: transactionSummary.wallet,
                  hash: transactionSummary.txId ? transactionSummary.txId : "",
                  location: location.locationInfo.city ? location.locationInfo.city + ", " + location.locationInfo.country_name : "",
                };

                setTimeout(() => {
                  emailBody.fee = this.cal__Fee().toFixed(2).toString();
                  console.log(subject, type, emailBody);
                  // transactionSummary.email
                  sendTransactionEmail(transactionSummary.email, subject, type, emailBody);
                }, 300);
              }
            ); //setState callback closed

            postUserKyc(this.props.email).then((res) => {
              if (res.error && response.code === 400) {
                alert("Session Expired");
                localStorage.clear();
                this.props.jumpToStep(0);
              } else if (res.error) {
                console.log(response);
                return;
              }
              const kycData = res.data.records;
              let kycStatus;
              if (kycData.length == 0) {
                kycStatus = "UNAVAILABLE";
              } else {
                if (kycData[0].status == "approved") {
                  kycStatus = "APPROVED";
                }
                if (kycData[0].status == "pending") {
                  kycStatus = "PENDING";
                }
              }
              this.setState({
                paymentDetails: response.result,
                kyc_approved: kycStatus,
              });
            });
          })
          .catch((error) => console.error(error));
      })
      .catch((e) => {
        console.log("inside error");
        console.error(e);

        getTransferDetailsForRequestUUID(this.props.uuid, config.CompanyUuid)
          .then((response) => {
            if (response.error && response.code === 400) {
              this.setState({ loading: false });
              alert("Session Expired");
              localStorage.clear();
              this.props.jumpToStep(0);
            } else if (response.error) {
              this.setState({ loading: false });
              console.log(response);
              return;
            }
            const data = response.result;
            console.log(data);
            const transactionSummary = {
              token: data.quoteCurrency,
              totalCharge: data.finalPrice,
              totalToRecieve: data.quotePrice,
              tx: data.markupFee,
              wallet: data.wallet,
              ...data,
            };
            console.log(transactionSummary);
            this.setState(
              {
                transaction_summary: transactionSummary,
              },
              () => {
                // send appropriate email
                // change email to transactionSummary.email later
                let subject = "";
                let type = "";
                if (transactionSummary.status === "DECLINED") {
                  subject = "Transaction Rejected";
                  type = "PAYMENT_TRANSFER_REJECTED";
                } else if (transactionSummary.status === "APPROVED") {
                  subject = "Transaction Completed";
                  type = "PAYMENT_TRANSFER_APPROVED";
                } else {
                  subject = "Transaction Pending";
                  type = "TRANSACTION_PENDING";
                }

                let emailBody = {
                  email: transactionSummary.email,
                  datetime: this.convertDate(transactionSummary.updatedAt),
                  ip: "",
                  amount: transactionSummary.quantity.toFixed(2).toString(),
                  fee: this.cal__Fee().toFixed(2).toString(),
                  wallet: transactionSummary.wallet,
                  hash: transactionSummary.txId ? transactionSummary.txId : "",
                  location: "",
                };

                setTimeout(() => {
                  emailBody.fee = this.cal__Fee().toFixed(2).toString();
                  console.log(subject, type, emailBody);
                  // transactionSummary.email
                  sendTransactionEmail(transactionSummary.email, subject, type, emailBody);
                }, 300);
              }
            ); //setState callback closed

            postUserKyc(this.props.email).then((res) => {
              if (res.error && response.code === 400) {
                alert("Session Expired");
                localStorage.clear();
                this.props.jumpToStep(0);
              } else if (res.error) {
                console.log(response);
                return;
              }
              const kycData = res.data.records;
              let kycStatus;
              if (kycData.length == 0) {
                kycStatus = "UNAVAILABLE";
              } else {
                if (kycData[0].status == "approved") {
                  kycStatus = "APPROVED";
                }
                if (kycData[0].status == "pending") {
                  kycStatus = "PENDING";
                }
              }
              this.setState({
                paymentDetails: response.result,
                kyc_approved: kycStatus,
              });
            });
          })
          .catch((error) => console.error(error));
      });
  }
  convertDate = (date) => {
    const x = new Date(date);
    return `${x.getDate() < 10 ? "0" + x.getDate() : x.getDate()}/${
      x.getMonth() + 1 < 10 ? "0" + (x.getMonth() + 1) : x.getMonth() + 1
    }/${x.getFullYear()}`;
  };
  getSuccessContent = () => {
    const statusClasses = ["transaction-details-col"];

    if (this.state.kyc_approved !== null) {
      if (this.state.kyc_approved == "APPROVED") {
        statusClasses.push("green-box");
      } else if (this.state.kyc_approved == "PENDING") {
        statusClasses.push("red-box");
      } else if (this.state.kyc_approved == "UNAVAILABLE") {
        statusClasses.push("gray-box");
      }
    }

    return (
      <Row>
        <Col md={6} mdOffset={1} style={{ padding: "25px", color: "black" }}>
          <h5 className="text-center heading-transaction">Transaction Summary</h5>
          {this.state.paymentDetails && (
            <>
              <div className="transaction-summary">
                <div className="transaction-details-col">
                  <p>Token </p>
                  <p>{this.state.transaction_summary.token}</p>
                  <p>Amount of (token) Being Purchased</p>
                  <p>{this.state.transaction_summary.originalPurchasedPrice.toFixed(2)}</p>
                  <p>Fees Paid</p>
                  <p>{this.cal__Fee().toFixed(2)}</p>
                  <p>Amount to be Charged</p>
                  <p>{(this.state.transaction_summary.originalPurchasedPrice + this.cal__Fee()).toFixed(2)}</p>
                  <p>Net Amount to be Transferred</p>
                  <p>{this.state.transaction_summary.quantity.toFixed(2)}</p>
                </div>
                <div className="transaction-details-wallet">
                  <p>Wallet Address:</p>
                  <p className="wallet-address">{this.state.paymentDetails.wallet}</p>
                </div>
              </div>
              <div className={statusClasses.join(" ")}>
                <p className="kyc-status">{}KYC Status</p>
                <p className="kyc-status">{this.state.kyc_approved}</p>
              </div>
            </>
          )}
        </Col>
        <Col md={6} style={{ padding: "25px" }}>
          {this.state.paymentDetails && (
            <>
              <h5 className="text-center">
                <span className="heading-transaction">Transaction status:</span> {this.state.paymentDetails.status}
              </h5>
              <Row>
                <Col md={12} mdOffset={1}>
                  {/* <p>TX id: {this.state.paymentDetails.txId}</p> */}
                </Col>
              </Row>
              <Row style={{ marginTop: "30px" }}>
                <Col mdOffset={1}>
                  {this.state.paymentDetails.status !== "DECLINED" ? (
                    <>
                      <p className="payment__Status">Your transaction is ready to go and you will receive your funds within 5 minutes</p>
                      <br />
                      <p className="payment__Status">Become an affiliate and earn cash back</p>
                    </>
                  ) : (
                    <p className="payment__Status">Transaction is Declined, please try again</p>
                  )}

                  {/* <CustomButton>
            Become an affiliate and earn cash back
          </CustomButton> */}
                </Col>
              </Row>
              <Row style={{ marginTop: "30px" }}>
                <Col mdOffset={1}>
                  {this.state.paymentDetails.status !== "DECLINED" ? (
                    <NavLink to="/auth/signup">
                      <CustomButton>Sign Up</CustomButton>
                    </NavLink>
                  ) : (
                    // <NavLink to="/">
                    <CustomButton onClick={this.handle__Purchase}>Submit New Purchase</CustomButton>
                    /* </NavLink> */
                  )}
                </Col>
              </Row>
            </>
          )}
        </Col>
        <Col xs={12} style={{ display: "none" }}>
          {
            <div>
              {"//Offer ID - 7297449, Event - initial"}
              {"----------------------------------------------"}
              {<img src="https://xportdigital405.o18.click/p?mid=4745&t=i&oid=7297449&adv_sub1=ready" width="0px" height="0px" />}
            </div>
          }
        </Col>
      </Row>
    );
  };

  getErrorContent = () => {
    return (
      <Row>
        <Col sm={12}>
          <h4 className="text-danger">{this.props.paymentError}</h4>
        </Col>
      </Row>
    );
  };
  cal__Fee = () => {
    // alert('coming');
    let price = this.state.transaction_summary.originalPurchasedPrice;
    let fee = (price * 3.5) / 100;
    if (fee < 4.99) {
      fee = 4.99;

      return fee;
    } else {
      return fee;
    }
  };

  handle__Purchase = () => {
    window.location.href = "/?redirect=true";
    // this.context.router.push("/");
    // console.log(this.state.steps);
    // this.props.setStepState(0, {
    //   email: ""
    // });

    // this.props.jumpToStep(1);
  };
  render() {
    const { paymentSuccess, paymentError } = this.props;
    return (
      <div className="wizard-step">
        {true ? this.getSuccessContent() : this.getErrorContent()}
        {/* <Row style={{ opacity: 0 }}>
          <Col md={6}>13</Col>
          <Col md={6}>13</Col>
        </Row> */}
        {this.state.loading && (
          <div className="spinner-container">
            <div className="spinner">
              {/* <Spinner animation="border" role="status" variant="light">
                       <span className="sr-only">Loading...</span>
                 </Spinner> */}
              <Loader />
              {/* <img src="https://i.pinimg.com/originals/59/22/20/5922208e18658f5e83b6ad801b895f71.gif" />  */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

class Wizard extends Component {
  state = {
    nextButtonText: "Next",
    backButtonText: "Back",
    steps: [
      { name: "Purchase", component: <Step1 />, stepState: null },
      { name: "KYC", component: <KYC />, stepState: null },
      { name: "Transaction Summary", component: <Step2 />, stepState: null },
      { name: "Confirmation", component: <Step3 />, stepState: null },
    ],
  };

  componentDidMount() {
    const div = document.createElement("div");
    div.classList.add("copyright-container");
    div.innerHTML = `<div className="copyright-container" style="display:flex;flex-direction:row;align-items:center;text-align:center;justify-self:center"><img src="/header-logo.svg" className="copyright-logo" alt="Logo" style="margin-right:20px;"/><h6>&copy; Xport Digital. All rights reserved</h6></div>`;
    document.getElementsByClassName("footer-buttons")[0].insertBefore(div, document.getElementById("prev-button"));
  }

  handleStepChange = (step) => {
    switch (step) {
      case 1:
        this.setState({
          nextButtonText: "Pay Now",
          backButtonText: "Back",
        });
        break;
      case 2:
        this.setState({
          homeButtonText: "Exit",
        });
        break;
      default:
        this.setState({
          nextButtonText: "Next",
          backButtonText: "Back",
        });
        break;
    }
  };

  setStepState = (stepIndex, stepData) => {
    const steps = { ...this.state.steps };
    steps[stepIndex] = { ...steps[stepIndex] };
    steps[stepIndex].stepState = stepData;
    this.setState({
      steps: steps,
    });
  };

  render() {
    /*
    const email = this.state.steps[0].stepState
      ? this.state.steps[0].stepState.controls.email.value
      : "";
    const uuid = this.state.steps[0].stepState
      ? this.state.steps[0].stepState.uuid
      : null; //Request UUID
    */

    const email = this.state.steps[0].stepState ? this.state.steps[0].stepState.controls.email.value : "";
    const uuid = this.state.steps[0].stepState
      ? this.state.steps[0].stepState.uuid
      : localStorage.getItem("uuid")
      ? localStorage.getItem("uuid")
      : null; //Request UUID
    const company_uuid = this.state.steps[0].stepState ? this.state.steps[0].stepState.company_uuid : null;
    const paymentSuccess = this.state.steps[2].stepState ? this.state.steps[2].stepState.paymentSuccess : null;
    const paymentError = this.state.steps[2].stepState ? this.state.steps[2].stepState.paymentError : null;

    console.log(uuid);
    const stepswithData = {
      ...this.state,
      steps: [
        { name: "Purchase", component: <Step1 stepIndex={0} setStepState={this.setStepState} stepState={this.state.steps[0].stepState} /> },
        {
          name: "KYC",
          component: (
            <KYC email={email} uuid={company_uuid} stepIndex={1} setStepState={this.setStepState} stepState={this.state.steps[1].stepState} />
          ),
        },
        {
          name: "Transaction Summary",
          component: <Step2 stepIndex={2} email={email} uuid={uuid} setStepState={this.setStepState} stepState={this.state.steps[2].stepState} />,
        },
        {
          name: "Confirmation",
          component: (
            <Step3
              email={email}
              stepIndex={3}
              uuid={uuid}
              paymentSuccess={paymentSuccess}
              paymentError={paymentError}
              setStepState={this.setStepState}
              stepState={this.state.steps[3].stepState}
            />
          ),
        },
      ],
    };

    return (
      <div className="main-content">
        <Card
          wizard
          id="wizardCard"
          textCenter
          // title="XPort Digital Crypto Gateway"
          content={
            <StepZilla
              steps={stepswithData.steps}
              stepsNavigation={false}
              // nextButtonCls="btn btn-prev btn-info btn-fill pull-right btn-wd"
              // backButtonCls="btn btn-next btn-default btn-fill pull-left btn-wd"
              onStepChange={this.handleStepChange}
              nextButtonText={this.state.nextButtonText}
              backButtonText={this.state.backButtonText}
              homeButtonText={this.state.homeButtonText}
              showNavigation={false}
              //  startAtStep={3}
            />
          }
        />
        {/* <h1>TEST text</h1> */}
      </div>
    );
  }
}

export default Wizard;
