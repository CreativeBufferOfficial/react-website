import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Step3 = (props) => {
  return (
    <div className="wizard-step">
      <h4 className="text-center pb--40">Payment Processing</h4>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Settlement crypto currency:</Form.Label>
            <Form.Control
              type="text"
              name="settlement_crypto"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Currency for settlements with XPort Digital Limited
            </Form.Label>
            <Form.Control
              type="text"
              name="settlement_currency"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Projected Monthly Volume (in USD):</Form.Label>
            <Form.Control
              type="text"
              name="monthly_volume"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Projected monthly number of transactions:</Form.Label>
            <Form.Control
              type="text"
              name="monthly_num"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Projected min. transaction amount:</Form.Label>
            <Form.Control
              type="text"
              name="projected_min"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Projected max. transaction amount:</Form.Label>
            <Form.Control
              type="text"
              name="projected_max"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Projected avg. transaction amount:</Form.Label>
            <Form.Control
              type="text"
              name="projected_avg"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Step3;
