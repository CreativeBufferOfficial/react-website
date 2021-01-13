import React from "react";
import CMD_WIDGET_2 from "../../../../assets/img/documentation/Command-Line.png";

const Docker = () => {
  return (
    <div className="text--dark right--side">
      <h2>Docker Integration</h2>
      
        <li>
          Integrate our widgets with configurations with our public docker images located here ....
        </li>
        <li>
          Non Crypto Transfer Widget will have Merchants CSS for look and feel.
        </li>
      
      <br />
      <p>Docker Script will request the following environment variables to mount to the container</p>
      <h3>
        Crypto Transfer Widget Docker Configurations
      </h3>
      {/* <img src={CMD_WIDGET_2} alt="cryto-widget" /> */}
      <ul>
        <li>Username:</li>
        <li>Password:</li>
        <li>CompanyUUID:</li>
        <li>Redirect URL:</li>
        <li>KYC Enabled: Yes/No</li>
        <li>Port:</li>
        <li>SSL Certificate:</li>
        <li>SSL Private Key:</li>
        <li>Host Domain:</li>
        <li>Preset Token: Allows the merchant to present the token on widget open.</li>
        <li>Tokens: Show only a list of specific tokens for purchase</li>
        <li>Logo:</li>
      </ul>
      <br />
      <h3>
        Non Crypto Transfer Widget Configuration
      </h3>
      {/* <img src={CMD_WIDGET_2} alt="non cryto-widget" /> */}
      <ul>
        <li>Username:</li>
        <li>Password:</li>
        <li>CompanyUUID:</li>
        <li>Redirect URL:</li>
        <li>KYC: Yes/No</li>
        <li>Port:</li>
        <li>SSL Certificate:</li>
        <li>SSL Private Key:</li>
        <li>Host Domain:</li>
      </ul>
    </div>
  );
};

export default Docker;
