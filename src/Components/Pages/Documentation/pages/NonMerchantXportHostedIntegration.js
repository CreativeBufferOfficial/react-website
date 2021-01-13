import React from "react";
import Highlight from "react-highlight";

const NonMerchantXportHostedIntegration = () => {
  return (
    <div className="text--dark right--side">
      <h2>Non Merchant XPort Hosted Integration</h2>
      <p>
        App will be hosted by XPort Digital and widgets will be openly
        accessible and XPort Branded. This option is primarily used by our
        Affiliate Partners.
      </p>
      <h3>Crypto Transfer Widget</h3>

      <Highlight className="html">
        {
          '<a href="https://widget_url/" target="_blank">\n Buy Stable Tokens with XPort Digital \n</a>'
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
          '<a href="https://widget_url/?userAddress=user blockchain address" target="_blank">\n Buy Stabletokens with XPort Digital \n</a>'
        }
      </Highlight>

      <br />
      <h3>Non Crypto Transfer Widget</h3>
      <Highlight className="html">
        {
          '<a href="https://widget_url/non_crypto/" target="_blank">\n Pay With XPort Digital\n</a>'
        }
      </Highlight>
    </div>
  );
};

export default NonMerchantXportHostedIntegration;
