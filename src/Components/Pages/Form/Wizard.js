import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../Layouts/Card";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Final";

export class Wizard extends Component {
  state = {};

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  componentDidMount() {
    const header = document.getElementsByClassName("header--section")[0];
    const footer = document.getElementsByClassName("footer--section")[0];

    header.style.display = "none";
    footer.style.display = "none";
  }

  handleFileChange = (e) => {};

  steps = [
    {
      name: "Company Information",
      component: <Step1 handleChange={this.handleChange} />,
    },
    {
      name: "Risk Management",
      component: <Step2 handleChange={this.handleChange} />,
    },
    {
      name: "Payment Processing",
      component: <Step3 handleChange={this.handleChange} />,
    },
    { name: "Security", component: <Step4 handleChange={this.handleChange} /> },
    {
      name: "Document Uploads",
      component: <Step5 handleChange={this.handleFileChange} />,
    },
  ];

  render() {
    return (
      <div className="main-content merchant-form" id="form-1345">
        <Container fluid>
          <Row>
            <Col className="col-md-8 col-lg-offset-2 pt--30">
              <Card
                wizard
                id="wizardCard"
                textCenter
                // title="XPort Digital Online Merchant"
                content={
                  <StepZilla
                    steps={this.steps}
                    stepsNavigation={false}
                    nextButtonCls="btn btn-prev btn-info btn-fill pull-right btn-wd bg-next"
                    backButtonCls="btn btn-next btn-default btn-fill pull-left btn-wd bg-prev"
                  />
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Wizard;
