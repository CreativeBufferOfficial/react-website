import React, { Component } from "react";
import { Grid, Row, Col, Media, FormControl, FormGroup } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

class RegisterPage extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="header-text">
              <h2>XPort Digital Merchant Sign Up</h2>
              <h4>Register and Join our Merchant Network Today</h4>
              <hr />
            </div>
          </Col>
          <Col md={4} mdOffset={2}>
            <Media>
              <Media.Left>
                <div className="icon">
                  {/* <i className="pe-7s-user" /> */}
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Only 3.5% Transaction Fees</Media.Heading>
                Take advantage of our low cost transaction fees and low cost KYC.
              </Media.Body>
            </Media>
            <Media>
              <Media.Left>
                <div className="icon">
                  {/* <i className="pe-7s-graph1" /> */}
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Customizable Widget</Media.Heading>
                Customize your payment widget and notifications look and feel to your sites overall design.
              </Media.Body>
            </Media>
            <Media>
              <Media.Left>
                <div className="icon">
                  {/* <i className="pe-7s-headphones" /> */}
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Low Chargebacks</Media.Heading>
                Our enhanced security features allow for little to no chargebacks from your customers.
              </Media.Body>
            </Media>
          </Col>
          <Col md={4}>
            <form>
              <Card
                plain
                content={
                  <div>
                    <FormGroup>
                      <FormControl type="text" placeholder="Your First Name" />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="Your Last Name" />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="Company" />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="email" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="password" placeholder="Password" autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        type="password"
                        autoComplete="off"
                        placeholder="Password Confirmation"
                      />
                    </FormGroup>
                  </div>
                }
                ftTextCenter
                legend={
                  <Button wd fill neutral>
                    Create Account
                  </Button>
                }
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default RegisterPage;