import React from "react";
import { Button } from "react-bootstrap";

const Final = (props) => {
  return (
    <div className="wizard-step">
      <h4 className="text-center pb--40">Step 6: Review Page and Submission</h4>
      <div className="wizard-finish-button">
        <p className="para">
          Company Name (Legal Name):{" "}
          <span className="text-data">{props.state.company_name}</span>
        </p>

        <Button
          bsStyle="info"
          // onClick={this.successAlert.bind(this)}
          className="pull-right bg-next"
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Final;
