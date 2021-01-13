import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Step4 = (props) => {
  return (
    <div className="wizard-step">
      <h4 className="text-center pb--40">Security</h4>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              IP addresses to be whitelisted (allow multiple IP’s)
            </Form.Label>
            <Form.Control
              type="text"
              name="ip_whitelisted"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Domain to be whitelisted (single domain)</Form.Label>
            <Form.Control
              type="text"
              name="domain_whitelisted"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Transaction webhook endpoint (we will display an info button with
              the object response)
            </Form.Label>
            <Form.Control
              type="text"
              name="transaction_webhook_endpoint"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <br />
              Merchant Account Password
            </Form.Label>
            <Form.Control
              type="text"
              name="merchant_account_pw"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Step4;
