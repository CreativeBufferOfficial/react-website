
import axios from "axios";
import publicIp from "public-ip";
import {host as baseUrl, kycHost as kycBaseUrl} from "../config/config.internal";
import { apiStackBaseUrl, ipDataBaseUrl } from "../config/baseUrl";
import { apiStackAPIKey, ipDataAPIKey } from "../config/apiKeys";
var token = "";
//  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwiZW1haWwiOiJ0ZXN0QHhwb3J0LWRpZ2l0YWwuY29tIiwiY29tcGFueV91dWlkIjoiZjRkNjViMjMtMWQ5Zi00YjVkLWFhYjItYzkzODk1YjY0MjZlIiwicm9sZSI6MiwiaWF0IjoxNjA3MzE3MDQyLCJleHAiOjE2MDc3NDkwNDJ9.r8xxjcr1apukaZRoEgIs33Gm3jI78tDrxEQ2Eujyq58";

const getQuote = (token) => {
  return fetch(
    `${baseUrl}/api/crypto-engine/pricing?symbol=${token + "-USD"}`
  ).then((response) => parseResponse(response));
};

const getTransaction = (requestUUID) => {
  return fetch(
    `${baseUrl}/api/crypto-engine/status?requestUUID=${requestUUID}`
  ).then((response) => parseResponse(response));
};

const getTransactionByEmail = (email) => {
  return fetch(
    `${baseUrl}/api/crypto-engine/status?email=${email}`
  ).then((response) => parseResponse(response));
};

const createAffiliateAccount = async (data) => {
  try {
    const ip = await publicIp.v4();
    const formData = new FormData();

    formData.append("first_name", data.firstname);
    formData.append("last_name", data.lastname);
    formData.append("email", data.email);
    formData.append("signup_ip", ip);
    formData.append("address", data.address);
    formData.append("password", data.password);
    formData.append("status", "Approved");

    const url =
      "https://api.offer18.com/api/m/affiliate_create?api-key=4745IQXJORKEDGMFNVA&secret-key=2869A0C49D655B78C320983D2519A08C&mid=4745";
    return new Promise((resolve, reject) => {
      axios
        .post(url, formData)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  } catch (err) {
    throw new Error(err);
  }
};

const createMerchantAccount = (data) => {
  var raw = {
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
    password: data.password,
    password_repeat: data.password_repeat,
    account_type: "1",
    company_name: data.company_name,

    status: "1",
  };

  const requestOptions = {
    method: "post",
    body: raw,
    redirect: "follow",
    mode: "no-cors",
  };

  const url =
    "https://xportdigitallimited.scaletrk.com/api/v2/network/affiliates?api-key=a8b38ace3007fe85a13bbbd8f12fd6bba8bb11ef";

  fetch(url, requestOptions).then((response) => {
    return parseResponse(response);
  });
};

const parseResponseText = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    //   const error = await response.json();
    const error = await response.json();
    console.log(error.status);
    alert(error.message);
    // throw new Error(error.message);
    return {error: error.message, code: error.code};
  }
};

const updateToken = (newToken) =>{
  token = newToken;
  localStorage.setItem('newToken', newToken); 
  console.log(token);
}

const parseResponse = async (response) => {
  return new Promise((resolve) => {
    if (response) {
      response.json().then(json => resolve(response)).catch(() => {
        resolve({response: response.message, code: response.code})
      })
    } else {
      resolve({response: response.message, code: response.code})
    }
  })
};

const createQuote = (body) => {
  return fetch(`${baseUrl}/api/crypto-engine/quote`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => parseResponseText(response));
};

const sendEmail = (body) => {
  return fetch(
    "https://jhvjpm2aad.execute-api.ap-southeast-1.amazonaws.com/default/SES-send-email",
    {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then((response) => parseResponse(response));
};

const getIpLocationInfo = (ip) => {
  return fetch(
    `${ipDataBaseUrl}${ip}?api-key=${ipDataAPIKey}`
  ).then((response) => parseResponse(response));
  // return  fetch(`${apiStackBaseUrl}${ip}?access_key=${apiStackAPIKey}&format=1`)
  // .then(response=>parseResponse(response))
};

const userAuth = (email,password) =>{
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      //   const error = await response.json();
      const error = await response.json();
      alert(error.error);
      return {error: error.message, code: error.code};
    }
  });
}

const postUserKyc = (email) => {
  return fetch(`${baseUrl}/user-kyc/search`, {
    method: "POST",
    body: JSON.stringify({
      perPage: 10,
      page: 1,
      searchQuery: email,
      kycStatus: "",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      //   const error = await response.json();
      const error = await response.json();
      alert(error.error);
      // throw new Error(error.error);
      return {error: error.message, code: error.code};
    }
  });
};

const postSubmitUserKyc = (data) => {
  return fetch(`${kycBaseUrl}/api/v1/user-kyc`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      //   const error = await response.json();
      const error = await response.json();
      alert(error.error);
      // throw new Error(error.error);
      return {error: error.message, code: error.code};
    }
  });
};

const getTransferDetailsForRequestUUID = (request_uuid, companyUUID) => {
  // alert("request uuid "+request_uuid);
  return fetch(
    `${baseUrl}/api/crypto-engine/status?requestUUID=`+request_uuid+'&companyUUID='+companyUUID,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    }
  ).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      //   const error = await response.json();
      const error = await response.json();
      alert(error.error);
      // throw new Error(error.error);
      return {error: error.message, code: error.code};
    }
  });
};

const getPaymentDetailsForUUID = (uuid) => {
  return fetch(`${baseUrl}/details/query/${uuid}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      //   const error = await response.json();
      const error = await response.json();
      alert(error.error);
      // throw new Error(error.error);
      return {error: error.message, code: error.code};
    }
  });
};

const postPayment = (data) => {
  return fetch(`${baseUrl}/api/payment/auth`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  }).then((response) => parseResponse(response));
};


const getCheckEnrolledCard = (cardNumber)=>{
  return fetch(`${baseUrl}/check-enrolled-status` , {    
      method: "POST", 
      body: JSON.stringify({
          cardNumber: cardNumber
      }), 
      headers: { 
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer "+token
      }})
  .then(response=>parseResponse(response))

}

const sendTransactionEmail = (receiver, subject, type, object) => {
  return fetch(`https://jhvjpm2aad.execute-api.ap-southeast-1.amazonaws.com/default/SES-send-email` , {    
    method: "POST", 
    body: JSON.stringify({
        receiver: receiver,
        subject: subject,
        type: type,
        object: object
    })})
      .then(response=>parseResponse(response));
}
const customCheck = ()=>{
  return fetch(`https://java-staging.fenige.pl:8181/fenige-mpi-visa` , {    
      method: "POST", 
      body: new URLSearchParams({
        'PaReq': 'eJxlkltvwjAMhf8K4p3m0qRUlYnE4GHVxMQuT3uLWguK2lDSFsG/n8NlbFqkSD6Oe+p8DnxuPeLyA4vBo4EVdp3d4KgqZ2M5lWpsYD1/x4OBI/qu2jsjIh5JYHdJX/hia11vwBaHp/zVaCVEooDdJDTo86XhtCa0BbBrApxt0HToStUgsIuCYj+43p9NIhJgdwGDr82279suY2xnj3ZS4hFrEQ2trcqorbNUqZgVdYWuBxaqgT3aWg8h6sj9VJUmX8w3//Yyj1e7txmwUAGl7dFILlIeSz4SOlM60ymwSx5sE9oyi6+XUax5xDnd9JqCNvxpfhV0Fo5+p4AQe3TFmcxjut5dAZ7avaPeDXH9iYE9Gl88B7pFT9jiADIsRSxpQKlKtNRqmsiUkN2KgmNF5CTn+mIZBLBgw27jJECXSVP05wV8A1/aqWQ=',
        'TermUrl': 'https://ecom-staging.fenige.pl/client/payments/terminate',
        'MD': 'YTZjZGYzM2ItODA5Yi00Y2YwLWJlNTUtZDBlMjYwNGZkMzkw'
    }), 
      headers: { 
          "Content-type": "application/x-www-form-urlencoded",
      }})
  .then(response=>console.log(response))
}
export {
  getQuote,
  createQuote,
  sendEmail,
  getIpLocationInfo,
  postUserKyc,
  postSubmitUserKyc,
  getPaymentDetailsForUUID,
  getTransferDetailsForRequestUUID,
  postPayment,
  getTransaction,
  getTransactionByEmail,
  createAffiliateAccount,
  createMerchantAccount,
  getCheckEnrolledCard,
  userAuth,
  updateToken,
  customCheck,
  sendTransactionEmail
};
