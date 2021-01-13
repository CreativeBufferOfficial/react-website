import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Step5 = (props) => {
  return (
    <div className="wizard-step">
      <h4 className="text-center pb--40">Document Uploads *Required*</h4>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Article of incorporation<span className="text-red ">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="article_incorporation"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Corporate Bank Account Statement
              <span className="text-red ">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="bank_acct_statement"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Business Registration<span className="text-red ">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="business_registration"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Passport of Company Director listed on the articles of
              incorporation<span className="text-red ">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="passport_company"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>KYC Policy</Form.Label>
            <Form.Control
              type="file"
              name="kyc_policy"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              AML Policy<span className="text-red ">*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="aml_policy"
              placeholder=""
              onChange={props.handleChange}
            />
          </Form.Group>
        </Col>

        <Row>
          <Col md={12}>
            <Form.Group>
              <Row style={{ padding: "15px" }}>
                <Col md={1} style={{ textAlign: "center" }}>
                  <Form.Check
                    inline
                    value="yes"
                    type="checkbox"
                    name="attestation"
                    onChange={props.handleChange}
                  />
                </Col>
                <Col md={11}>
                  <Form.Label style={{ marginLeft: "-20px", fontSize: "13px" }}>
                    I certify that all of the above information is complete and
                    true. Supplying false information gives rise to liability
                    laid down in the legislation. I undertake to immediately
                    notify XPort Digital Limited in writing of any material
                    changes in the information provided.
                  </Form.Label>
                </Col>
              </Row>
            </Form.Group>

            <Row>
              <p className="text-left" style={{ paddingLeft: "113px" }}>
                <a href="/pep.html" target="__blank">
                  PEP
                </a>
              </p>
            </Row>
          </Col>
        </Row>
        <Button
          bsStyle="info"
          className="pull-right bg-next bg-exit"
          style={{
            position: "relative",
            top: "53px",
            marginRight: "20px",
            marginBottom: "-30px",
          }}
        >
          Exit
        </Button>

        <Button
          bsStyle="info"
          className="pull-right bg-next"
          style={{
            position: "relative",
            top: "53px",
            right: "100px",
            marginRight: "20px",
            marginBottom: "-30px",
          }}
        >
          Finish
        </Button>
      </Row>
    </div>
  );
};

export default Step5;
