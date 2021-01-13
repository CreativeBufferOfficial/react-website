import React, { Fragment, useState } from "react";
import {
  Container,
  Row,
  Col,
  Media,
  FormControl,
  FormGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Select from "react-select";

import {
  createAffiliateAccount,
  createMerchantAccount,
} from "../../../common/apiService";
import Spinner from "../../Layouts/Spinner";
import history from "./../../../@history";
import "./styles.css";

const Index = () => {
  const [value, setValue] = useState({
    loading: false,
  });

  const [popupVisible, setPopupVisible] = useState(false);

  const [textData, setTextData] = useState({
    heading: "XPort Digital Merchant Sign Up",
    subHeading: "Register and Join our Merchant Network Today",
    bullet1: "Only 3.5% Transaction Fees",
    bulletsub1:
      "Take advantage of our low cost transaction fees and low cost KYC.",
    bullet2: "Customizable Widget",
    bulletsub2:
      "Customize your payment widget and notifications look and feel to your sites overall design.",
    bullet3: "Low Chargebacks",
    bulletsub3:
      "Our enhanced security features allow for little to no Chargebacks from your customers.",
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_repeat: "",
    company_name: "",
    address: "",
  });

  const [currentAccountType, setAccountType] = useState();

  const [currentTab, setTab] = useState("merchant");

  const { loading } = value;

  const onContentLoaded = (e) => {
    setValue({ loading: false });
  };

  const switchTab = (tab) => {
    setTab(tab);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_repeat: "",
      company_name: "",
      address: "",
    });

    switch (tab) {
      case "merchant":
        setTextData({
          heading: "XPort Digital Merchant Sign Up",
          subHeading: "Register and Join our Merchant Network Today",
          bullet1: "Only 3.5% Transaction Fees",
          bulletsub1:
            "Take advantage of our low cost transaction fees and low cost KYC.",
          bullet2: "Customizable Widget",
          bulletsub2:
            "Customize your payment widget and notifications look and feel to your sites overall design.",
          bullet3: "Low Chargebacks",
          bulletsub3:
            "Our enhanced security features allow for little to no Chargebacks from your customers.",
        });
        break;
      case "affiliate":
        setTextData({
          heading: "XPort Digital Affiliate Sign Up",
          subHeading: "Register Today and Join our Affiliate Network",
          bullet1: "Earn Cash Back",
          bulletsub1:
            "Build your network and watch your referral transactions earn rewards",
          bullet2: "Continuously Providing New Offers",
          bulletsub2:
            "XPort Digital will have new offers to incentive all of our users",
          bullet3: "Automated Payouts",
          bulletsub3: "Provide your wallet address, receive cash back!",
        });
        break;
      default:
        break;
    }
  };

  const setAccount = (accountType) => {
    setAccountType(accountType);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createAccount = async (e) => {
    try {
      e.preventDefault();
      const {
        email,
        firstname,
        lastname,
        password,
        password_repeat,
        company_name,
        address,
      } = formData;

      console.log(currentTab);

      if (currentTab === "merchant") {
        console.log(formData)
        const response = await createMerchantAccount(formData);
      } else {
        if (email != "" && firstname != "" && lastname != "" && address != "") {
          const response = await createAffiliateAccount(formData);
          console.log(response);
          if (response.status == "200") {
            setPopupVisible(true);
            setFormData({
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              password_repeat: "",
              company_name: "",
              address: "",
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  history.push("/auth/signup");

  return (
    <div>
      {!loading && <Spinner />}
      {popupVisible && (
        <div className="popup-container" onClick={() => setPopupVisible(false)}>
          <div className="registration-popup">
            <p>
              Congratulations your account is created. Click{" "}
              <a href="https://affiliates.xport-digital.com/" target="_blank">
                here
              </a>{" "}
              to Log into your Dashboard
            </p>
          </div>
        </div>
      )}

      <Container className="text-center">
        <Row className="pt--60 text-white">
          <Col md={12}>
            <div className="header-text heading">
              <div>
                <h2>{textData.heading}</h2>
                <h4>{textData.subHeading}</h4>
              </div>
              <div className="switch-container">
                <div className="switch">
                  <p
                    onClick={() => switchTab("merchant")}
                    className={currentTab == "merchant" ? "active" : ""}
                  >
                    Merchant
                  </p>
                  <p
                    onClick={() => switchTab("affiliate")}
                    className={currentTab == "affiliate" ? "active" : ""}
                  >
                    Affiliate
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </Col>

          <Col md={6}>
            <Media>
              <Media.Body>
                <h3>{textData.bullet1}</h3>
                {textData.bulletsub1}
              </Media.Body>
            </Media>
            <Media>
              <Media.Body>
                <h3>{textData.bullet2}</h3>
                {textData.bulletsub2}
              </Media.Body>
            </Media>
            <Media>
              <Media.Body>
                <h3>{textData.bullet3}</h3>
                {textData.bulletsub3}
              </Media.Body>
            </Media>
          </Col>
          <Col md={6}>
            <form onSubmit={createAccount}>
              {currentTab == "merchant" ? (
                <div>
                  <FormGroup>
                    <FormControl
                      type="text"
                      required  
                      placeholder="Your First Name"
                      name="firstname"
                      onChange={handleChange}
                      value={formData.firstname}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Your Last Name"
                      name="lastname"
                      onChange={handleChange}
                      value={formData.lastname}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Company"
                      name="company_name"
                      onChange={handleChange}
                      value={formData.company_name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <FormControl
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      name="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="password"
                      autoComplete="off"
                      placeholder="Password Confirmation"
                      name="password_repeat"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="text"
                      autoComplete="off"
                      placeholder="Wallet address"
                      name="custom_fields"
                      onChange={handleChange}
                    />
                  </FormGroup> */}
                </div>
              ) : (
                <div>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Your First Name"
                      name="firstname"
                      onChange={handleChange}
                      value={formData.firstname}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Your Last Name"
                      name="lastname"
                      onChange={handleChange}
                      value={formData.lastname}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormControl
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormControl
                      type="text"
                      autoComplete="off"
                      placeholder="Wallet address"
                      name="address"
                      onChange={handleChange}
                      value={formData.address}
                    />
                  </FormGroup>
                </div>
              )}

              <Button
                type="submit"
                className="pull-right "
                onClick={createAccount}
              >
                Create Account
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
