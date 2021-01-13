import React from "react";
import { Link } from 'react-router-dom';
import WIDGET_1 from "../../../../assets/img/documentation/Widget-1.png";
import WIDGET_2 from "../../../../assets/img/documentation/Widget-2.png";

const Introduction = () => {
  return (
    <div className="text--dark right--side">
      <h2>XPort Digital Widget Integration</h2>
      <p className="text--dark">
        XPort Digital provides 2 widget gateway options which will allow our
        merchants process credit card transactions for instant crypto transfer
        to their user and non crypto transfers.
      </p>
      <br></br>
      <h3>Crypto Transfer Widget</h3>
      <p className="text--dark">
        The XPort Digital Crypto Transfer Widget is full solution that facilitates the full crypto purchasing process. Widget provides real time and competitive prcicing, real time KYC, credit card processing and transfer of tokens to the users wallet. XPort Digital also supports over 100 tokens for purchase and transfer.
        <br />
        <br />
        <p>Please see our <strong>Demo Application</strong> here <Link target='_blank' to={"//cryptowidget-test.xport-digital.com"}><strong>Crypto Transfer Demo</strong></Link></p>
        {/* <img src={WIDGET_1} alt="cryto-widget" /> */}

      </p>

      <br />
      <h3>Non Crypto Transfer Widget</h3>
      <p className="text--dark">
        Looking for simplified credit card processing solution, the XPort Digital Non Crypto Transfer Widget will process credit card transactions and allow you to faciliate your own crypto transfers to your customers.
        <br />
        <br />
        <p> Please see our <strong>Demo Application</strong> here <Link target='_blank' to={"//widgetapp-test.xport-digital.com"}><strong>Non Crypto Transfer Demo</strong></Link></p>
        {/* <img src={WIDGET_2} alt="non cryto-widget" /> */}
      </p>
    </div>
  );
};

export default Introduction;
