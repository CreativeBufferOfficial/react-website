import React from "react";
import Highlight from "react-highlight";

const ApprovedMerchantXportHostedIntegration = () => {
  return (
    <div className="text--dark right--side">
      <h2>Approved Merchant XPort Hosted Integration</h2>
      <p>
        App will be hosted by XPort Digital and Widget should be integrated as
        an iFrame. URL will be appended with Merchants company_uuid.
      </p>
      <p>
        XPort Digital will apply the following applicable configurations by
        default.
      </p>
      <ul>
        <li>Merchant CSS - Widget & Email Notifications</li>
        <li>Merchant Logo - Widget & Email Notifications</li>
        <li>Post Payment Redirect to Merchants Target URL</li>
      </ul>
      <h3>Crypto Transfer Widget</h3>
      <Highlight className="html">
        {
          '<a href="https://widget_url/company_uuid" target="_blank">\n Buy Stable Tokens with: Merchants Name \n</a>'
        }
      </Highlight>

      <br />
      <ul>
        <li>
          Allow for wallet address to be pre-populated *Crypto Transfer Widget
          Only*
        </li>
      </ul>
      <Highlight className="html">
        {
          '<a href="https://widget_url/company_uuid?userAddress=user blockchain address" target="_blank" >\n Buy Stable Tokens with Merchants Name \n</a>'
        }
      </Highlight>
      <br />
      <h3>Non Crypto Transfer Widget</h3>
      <Highlight className="html">
        {
          '<a href="https://widget_url/non_crypto/company_uuid" target="_blank">\n Buy Stable Tokens with Merchants Name \n</a>'
        }
      </Highlight>
    </div>
  );
};

export default ApprovedMerchantXportHostedIntegration;
