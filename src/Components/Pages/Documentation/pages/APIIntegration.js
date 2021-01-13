import React from "react";
import Highlight from "react-highlight";

const APIIntegration = () => {
  return (
    <div className="text--dark right-side">
      <h2>API Integration</h2>
      <ul>
        <li>
          <p>
            Merchants will be allowed to integrate with an REST API solution
            that will launch the widget with their configurations.
          </p>
          <ul>
            <li>Crypto Transfer Widget - See Configurations</li>
            <li>Non Crypto Transfer Widget - No</li>
          </ul>
        </li>
        <li>
          We will allow the merchant to generate an API key in the Dashboard
          based on the JWT
        </li>
        <li>
          <p >
            We will expose the transfer status API and issue KYC and and
            transactions via the webhook.
          </p>
          <ul>
            <li>Display Transfer status API call and response</li>
            <li>Display KYC Webhook json object</li>
            <li>Display Transaction status json object</li>
          </ul>
        </li>
      </ul>
      <br />
      <h5>launch Crypot Transfer sWidget</h5>
      <Highlight className="html">
            <p>Method: POST</p>
            <p>Host: payment-test.xport-digital.com</p>
            <p>Endpoint: /launch/crypto_widget</p>
            <p>Add JWT to Header</p></Highlight>
            <br   />
            <Highlight className="html">
                {
                    `{\n "kyc_enabled": true, //true or false//\n "preset_token": "USDT", //optional//\n "tokens": "USDT, ETH, BTC", //optional//\n "wallet_address": "0x12323231312312323sd0o", //optional//\n "disclaimer": "Your legal disclaimer text here", //optional//\n "t_c": "URL to your terms and conditions", //optional//\n "email": "@domain.com" //optional\n }`
                }
            </Highlight>
      <h3>Crypto Transfer Widget Configuration Options</h3>
      <ul>
        <li>
          Bolean - KYC Configuration - Allow the merchant to use our KYC or not
          use our KYC. If a merchant uses their own KYC then their users will
          bypass our KYC and 24 hour KYC hold, however the merchant will be
          required to send KYC objects to our KYC webhook endpoint. The KYC
          payment/auth restriction will still apply here
        </li>
        <li>
          String - Preset Token - Allows the merchant to present the token on
          widget open.
        </li>
        <li>
          String - Show Only - Show only a list of specific tokens for purchase
        </li>
        <li>String - Pre-populate wallet address</li>
        <li>String - Apply disclaimer text at the bottom of the widget</li>
        <li>
          String - Apply terms and conditions and or additional disclaimer links
          to the widget
        </li>
        <li>String - Prepopulate users email address</li>
      </ul>
    </div>
  );
};

export default APIIntegration;
