var host = "";
var kycHost = "";

const environment = "staging";

if (environment === "staging") {
  host = "https://payment-test.xport-digital.com";
  kycHost = "https://payment-kyc-test.xport-digital.com";
} else {
  host = "https://payment.xport-digital.com";
  kycHost = "https://payment-kyc.xport-digital.com";

}

export {host, kycHost};