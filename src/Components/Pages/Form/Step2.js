import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Step2 = (props) => {
  return (
    <div className="wizard-step">
      <h4 className="text-center pb--40">AML and Risk Management</h4>

      <Row>
        <Col md={12}>
          <Form.Group>
            <Form.Label>
              Short description of the service: (Specific steps in this process
              with the role of XPort Digital Limited and how it looks from the
              end-user's perspective. Please avoid mental shortcuts and use full
              names.)
            </Form.Label>
            <Form.Control
              type="text"
              name="description_service"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Category of activity: (E.g.: Transportation services, pet shop)
            </Form.Label>
            <Form.Control
              type="text"
              name="category_activity"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Do you offer customer support?</Form.Label>
            <Form.Check
              inline
              label="&nbsp;Yes"
              type="radio"
              name="customer_support"
              value="yes"
              onChange={props.handleChange}
            />
            <Form.Check
              inline
              label="&nbsp;No"
              type="radio"
              name="customer_support"
              value="no"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Are you compatible with business security standards?
            </Form.Label>
            <Form.Check
              inline
              label="&nbsp;Yes"
              type="radio"
              value="yes"
              name="security_standards"
              onChange={props.handleChange}
            />
            <Form.Check
              inline
              label="&nbsp;No"
              type="radio"
              value="no"
              name="security_standards"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Is your application/website secured by SSL certificate?
            </Form.Label>
            <Form.Check
              inline
              label="&nbsp;Yes"
              type="radio"
              value="yes"
              name="secured_ssl_cert"
              onChange={props.handleChange}
            />
            <Form.Check
              inline
              label="&nbsp;No"
              type="radio"
              value="no"
              name="secured_ssl_cert"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Do you use Card on File/Wallet functionality? (Applies to card
              storage)
            </Form.Label>
            <Form.Check
              inline
              label="&nbsp;Yes"
              type="radio"
              value="yes"
              name="card_file"
              onChange={props.handleChange}
            />
            <Form.Check
              inline
              label="&nbsp;No"
              value="no"
              type="radio"
              name="card_file"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <br />
              Do you want XPort Digital Limited to provide card storage?
            </Form.Label>
            <Form.Check
              inline
              label="&nbsp;Yes"
              type="radio"
              value="yes"
              name="card_storage"
              onChange={props.handleChange}
            />
            <Form.Check
              inline
              label="&nbsp;No"
              type="radio"
              value="no"
              name="card_storage"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Do you have video KYC integrated into your platform?
            </Form.Label>
            <Form.Check
              inline
              label="&nbsp;Yes"
              type="radio"
              value="yes"
              name="integrated_platform"
              onChange={props.handleChange}
            />
            <Form.Check
              inline
              label="&nbsp;No"
              type="radio"
              value="no"
              name="integrated_platform"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Do you have established KYC and AML policies?
            </Form.Label>
            <Form.Check
              inline
              label="&nbsp;Yes"
              type="radio"
              value="yes"
              name="integrated_platform"
              onChange={props.handleChange}
            />
            <Form.Check
              inline
              label="&nbsp;No"
              type="radio"
              value="no"
              name="integrated_platform"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Step2;
