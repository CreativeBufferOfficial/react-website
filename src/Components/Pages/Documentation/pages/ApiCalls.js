import React from "react";
import Highlight from "react-highlight";

const ApiCalls = () => {
    return (
        <div className="text--dark right--side">
            <h2>XPort API Calls</h2>
            <br />
            
            <h5>Authorization Call for JWT</h5>
            <Highlight className="html">
            <p>Method: POST</p>
            <p>Host: payment-test.xport-digital.com</p>
            <p>Endpoint: /auth/login</p></Highlight><br />
            <p> Call Body: Use the x-www-form-urlencoded: and input your user account email and password </p>
            <br />
            <h5>
                Response
            </h5>
            <Highlight className="html">
                {
                    `{\n   "message": "Successfully loggedin",\n   "code": 200,\n   "user_id: 25,\n   "authenticated": true,\n   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNSwiZW1haWwiOi\n             JjcnlwdG8tdGVzdEB4cG9ydC1kaWdpdGFsLmNvbSIsImNvbXBhbnlfdXVpZCI6ImJj\n             YTQ0Yzg4LTA0NDUtNGFiMC1hYjQ3LTFkMTYyYTU4N2Q0NiIsInJvbGUiOjIsImlhdC\n             I6MTYwODAyMjQ1NCwiZXhwIjoxNjA4NDU0NDU0fQ.jsu6WcnCg1mZYKNQjBYdNfEve_1\n             ZeupgxlNToajJwfs"\n}`
                }
            </Highlight>

            <br />
            
            <h5>Crypto Transfer Status:</h5>
            <Highlight className="html">
            <p>Method: GET</p>
            <p>Host: payment-test.xport-digital.com</p>
            <p>Endpoint Search By Email: api/crypto-engine/status?email=</p>
            <p>Endpoint Search By RequestUUID: api/crypto-engine/status?requestUUID=...companyUUID=....</p>
            <p>Add JWT to Header</p>
            </Highlight><br />
            <h5>
                Response
            </h5>
            <Highlight className="html">
                {
                    `{\n    "meta": {\n               "time": "2020-12-15T08:48:29.948Z"\n            },\n    "result": [\n        {\n          "id": 678,\n          "requestUUID": "07486c78-7409-4e55-8c55-d3e1c480ae2e",\n          "email": "",\n          "companyUUID": "",\n          "quotePrice": 1.0006,\n          "originalPurchasedPrice": 517.5,\n          "markupFee": 0.020012,\n          "markupFeePercentage": 0.02,\n          "finalPrice": 1.020612,\n          "quantity": 507.04871195,\n          "baseCurrency": "USD",\n          "quoteCurrency": "USDT",\n          "proceedsCurrency": "USDT",\n          "wallet": "0x7bbafE4C3C3CC17e9e6E65E4B62f557D0707D60e",\n          "txId": null,\n          "transferred": false,\n          "status": "OPEN",\n          "initialTransfer": false,\n          "requestedAt": "2020-12-10T00:33:31.000Z",\n          "quotedAt": "2020-12-10T00:33:31.000Z",\n          "fullySettledAt": null,\n          "createdAt": "2020-12-10T00:33:31.000Z",\n          "updatedAt": "2020-12-10T00:33:31.000Z" \n        }\n     ]\n}`
                }
            </Highlight>
            <br />
            <h5>Customer KYC Status</h5>
            <Highlight className="html">
            <p>Method: POST</p>
            <p>Host: payment-test.xport-digital.com</p>
            <p>Endpoint: /user-kyc/search</p>
            <p>Add JWT to Header</p></Highlight>
            <br />
            <h5>Request Body</h5>
            <Highlight className="html">
                {
                    `{\n   "perPage" : "10",\n   "page" : "1",\n   "searchQuery" : "email",\n   "kycStatus" : "approved, pending, rejected" \n}`
                }
            </Highlight>
            <br />
            <h5>Response</h5>
            <Highlight className="html">
                {
                    `{\n   "code" : "200",\n   "data" :{\n   "numOfPages": 1\n   "totalRecordCount": 1,\n   "perPage": 10,\n   "records":[\n        {\n            "ref_id": null,\n            "email": "",\n            "status": "approved",\n            "company_uuid": "bca44c88-0445-4ab0-ab47-1d162a587d46",\n            "created_at": "2020-12-11T09:09:43.000Z",\n            "updated_at": "2020-12-11T09:10:25.000Z",\n            "deleted_at": null\n        }\n     ]\n   }\n}`
                }
            </Highlight>
            <br /><br />
            
        </div>
    );
};

export default ApiCalls;
