import React, { useEffect, useState } from "react";
import "./styles.css";
import jQuery from "jquery";
import OwlCarousel from "react-owl-carousel2";
import Spinner from "../../Layouts/Spinner";
import {
  getTransaction,
  getTransactionByEmail,
} from "../../../common/apiService";
import { Link } from "react-router-dom";
import banner from "../../../assets/img/page-header-img/banner-bg1.jpg";

const Index = () => {
  const [value, setValue] = useState({
    loading: false,
  });

  const [requestEmail, setRequestEmail] = useState("");

  const [transaction, setTransaction] = useState({});

  const [transactionMsg, setTransactionMsg] = useState("Please search with your email to see your Transactions.");

  const [emailClass, setEmailClass] = useState("form-control");

  const { loading } = value;

  useEffect(() => {
    window.jQuery = jQuery;
  }, []);

  const onContentLoaded = (e) => {
    setValue({ loading: true });
  };

  const handleChange = (e) => {
    console.log("handleChange" + e.target.value);
    setRequestEmail(e.target.value);
  };

  const makeRequest = async (e) => {
    console.log("uiui");
    e.preventDefault();
    console.log("uiuieee");
    if (requestEmail != "") {
      setEmailClass("form-control");
      // console.log(requestEmail);
      // console.log("Making api call");
      const transactionResponse = await getTransactionByEmail(requestEmail);
      // console.log(transactionResponse);
      setTransaction(transactionResponse.result);
      if (Object.keys(transaction).length <= 0) {
        setTransactionMsg("No Transaction Found.");
      }
      // console.log(transactionResponse);
      // const url = `https://ropsten.etherscan.io/tx/${transaction.txId}`;
      // window.open(url, "_blank");
    } else {
      setEmailClass("form-control email-error");
    }
  };

  useEffect(() => {
    setTransactionMsg("Please search with your email to see your Transactions.");
    setRequestEmail("");
    setEmailClass("form-control");
    setTransaction({});
  }, []);
  const options = {
    items: 1,
    nav: false,
    rewind: false,
    autoplay: false,
    loop: false,
    dots: false,
    autoplayHoverPause: false,
  };

  const formatDate = (date) => {
    const newDate = new Date(date);

    var day = newDate.getDate();

    var month = newDate.getMonth();

    var year = newDate.getFullYear().toString();
    year = year.split("");

    year = `${year[year.length - 2]}${year[year.length - 1]}`;

    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    const newDate = new Date(date);

    var hours = newDate.getUTCHours();

    var minutes = newDate.getUTCMinutes();

    var seconds = newDate.getUTCSeconds();

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  const transactionListing = (records) => {

    let latestRecords = records.slice(Math.max(records.length - 10, 0))

    var histories = latestRecords.map((item, index) => {
      return (
        <tr key={index}>
          <th data-label="Transaction ID">
            {item.requestUUID}
          </th>
          <td data-label="Date">
            {formatDate(item.createdAt)}
          </td>
          <td data-label="Time">
            {formatTime(item.createdAt)}
          </td>
          <td data-label="Amount">
            $
            {item.quantity &&
              parseInt(item.quantity.toString().substring(0, 5)).toFixed(2)}
          </td>
          <td data-label="Token">{item.quoteCurrency}</td>
          <td data-label="Settlement Date">
            {String(item.status).toLowerCase() !== "completed" ? "---" : formatDate(item.fullySettledAt)}
          </td>
          <td data-label="Status">{item.status}</td>

          <td data-label="Transfer Hash">
            {String(item.status).toLowerCase() === "completed" && <a
              href={`https://ropsten.etherscan.io/tx/${item.txId}`}
              className="btn btn-primary active"
              target="_blank"
            >
              TX Etherscan
            </a>}
          </td>
        </tr>
      )
    })
    return histories;
  }
  return (

    <div onLoad={onContentLoaded}>
      {!loading && <Spinner />}

      <section className="banner--item page--header--section pt--30 pb--150 bg--overlay">
        <div className="container">
          <div className="page--header-breadcrumb text-uppercase text-center">
            <ol className="breadcrumb"></ol>
          </div>
          <div className="page--header-title text-uppercase text-center"></div>
        </div>
      </section>

      <section className="domain-search--section pt--20 pb--10">
        <div className="container">
          <div className="section--title pb--30 text-center">
            <h2 className="h1 text-uppercase">Find Your Transactions</h2>

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>Enter Your Email For Your Transaction Status and History</p>
              </div>
            </div>
          </div>

          <div className="domain-search--form">
            <form onSubmit={makeRequest}>
              <div className="row gutter--0">
                <div className="col-md-6 col-md-offset-3">
                  <div className="input-group">
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Your Email Here"
                      className={emailClass}
                      required
                      onChange={handleChange}
                    />
                    <div className="input-group-addon">
                      <button
                        type="submit"
                        className="btn btn-default active"
                        onClick={makeRequest}
                      >
                        <i className="ml--8 fa fa-search search-icon"> Search</i>
                      </button>
                    </div>
                  </div>
                  <div className="extras"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="pricing--section pt--70 pb--80 section--divider-top">
        <div className="container">
          <div className="section--title pb--50 text-center">
            <h2 className="h1 text-uppercase">Transaction History</h2>

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
              </div>
            </div>
          </div>

          <div className="pricing--table text-center">
            {Object.keys(transaction).length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>Token</th>
                    <th>Settlement Date</th>
                    <th>Status</th>
                    <th>Transfer Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionListing(transaction)}
                </tbody>
              </table>
            )}
            {Object.keys(transaction).length <= 0 && (
              <div>{transactionMsg}</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
