import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Step1 = (props) => {
  // constructor=(props)=> {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     emailError: null
  //   };
  // }
  // isValidated =()=> {
  //   var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   re.test(this.state.email) === false
  //     ? this.setState({
  //         emailError: (
  //           <small className="text-danger">
  //             Email is required and format should be <i>john@doe.com</i>.
  //           </small>
  //         )
  //       })
  //     : this.setState({ emailError: null });
  //   return re.test(this.state.email);
  // }

  return (
    <div className="wizard-step">
      <h4 className="text-center pb--40">Company Information</h4>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Company name (Legal Name):</Form.Label>
            <Form.Control
              type="text"
              name="company_name"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Place and date of Company registration:</Form.Label>
            <Form.Control
              type="text"
              name="company_registration"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Number of employees:</Form.Label>
            <Form.Control
              type="number"
              name="number_employees"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Company registration No.:</Form.Label>
            <Form.Control
              type="number"
              name="company_reg"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Registered address:</Form.Label>
            <Form.Control
              type="text"
              name="reg_address"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Business address:</Form.Label>
            <Form.Control
              type="text"
              name="bus_address"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Company website:</Form.Label>
            <Form.Control
              type="text"
              name="company_website"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <br />
              VAT/Tax ID:
            </Form.Label>
            <Form.Control
              type="text"
              name="vat_taxid"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Settlement account: Bank account number for settlements with XPort
              Digital Limited
            </Form.Label>
            <Form.Control
              type="text"
              name="settle_acct"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Settlement account currency:</Form.Label>
            <Form.Control
              type="text"
              name="acct_currency"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>CEO Name:</Form.Label>
            <Form.Control
              type="text"
              name="ceo_name"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Step1;
