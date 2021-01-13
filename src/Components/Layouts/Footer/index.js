import React, { useState } from "react";
import Img_1 from "../../../assets/img/logo.png";
import Logo from "../../../assets/img/Logo/Footer.png";
import "./styles.css";
import { animateScroll as scroll } from "react-scroll";
import $ from "jquery";

const Index = () => {
  const [value, setValue] = useState({
    top: false,
  });

  const { top } = value;

  const backToTop = () => {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $(".back-to-top").fadeIn("slow");
      } else {
        $(".back-to-top").fadeOut("slow");
      }
    });
    setValue({ top: true });
  };

  const scrollToTop = () => {
    scroll.scrollToTop(100);
  };
  return (
    <div onScroll={backToTop}>
      {top ? backToTop() : ""}
      <footer className="footer--section footer-bg">
        <div className="footer--widgets pt--90 pb--30 pr--30 pl--30">
          <div className="container">
            <div className="row AdjustRow">
              <div className="col-md-3 col-xs-6 col-xss-12 pb--60">
                <div className="widget">
                  <div className="about--widget">
                    <div className="logo">
                      {/* <img src={Logo} alt="" /> */}
                    </div>
                    <address>
                      <p>
                        Room 907, Silvercord Tower 2, 30 Canton Road,
                        Tsimshatsui, Kowloon, Hong Kong
                      </p>
                    </address>
                    <dl>
                      <dt>
                        <i className="fa fa-envelope-o"></i>Email
                      </dt>
                      <dd>
                        <p>
                          <span>Sales:</span>
                          <a
                            href="mailto:sales@xport-digital.com"
                            className="btn-link"
                          >
                            sales@xport-digital.com
                          </a>
                        </p>
                        <p>
                          <span>Support:</span>
                          <a
                            href="mailto:support@xport-digital.com"
                            className="btn-link"
                          >
                            support@xport-digital.com
                          </a>
                        </p>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-xs-6 col-xss-12 pb--60">
                <div className="widget">
                  <h2 className="h4 widget--title text-uppercase">Resources</h2>
                  <div className="links--widget">
                    <ul className="nav">
                      <li>
                        <a target='_blank' href="/static/policies/privacy-policy.html">Privacy Policy</a>
                      </li>
                      <li>
                        <a target='_blank' href="/static/policies/terms-and-conditions.html">Terms and Conditions</a>
                      </li>
                      <li>
                        <a target='_blank' href="/static/policies/cookie-policy.html">Cookie Policy</a>
                      </li>
                      <li>
                        <a target='_blank' href="/static/policies/return-and-refund-policy.html">Refunds Policy</a>
                      </li>
                      <li><a target='_blank' href="/static/policies/disclaimer.html">Disclaimer</a>
                      </li>
                      <li>
                        <a href="#">FAQ</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xs-6 col-xss-12 pb--60">
                <div className="widget">
                  <h2 className="h4 widget--title text-uppercase">
                    Quick Links
                  </h2>
                  <div className="links--widget">
                    <ul className="nav">
                      <li>
                        <a href="/about">About Us</a>
                      </li>
                      {/* <li>
                        <a href="#">Our Team</a>
                      </li> */}
                      <li>
                        <a href={"/"} target='_blank'>Buy Crypto</a>
                      </li>
                      <li>
                        <a href="/api-documentation">API Documentation</a>
                      </li>
                      <li>
                        <a href="/affiliate">Our Affilate Program</a>
                      </li>
                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xs-6 col-xss-12 pb--60">
                <div className="widget"></div>
                <div className="widget">
                  <div className="img---widget"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer--copyright pt--30 pb--30 pr--30 pl--30">
          <div className="container">
            <ul className="social nav">
              <li>
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-google-plus"></i>
                </a>
              </li>
            </ul>
            <p className="copyright--text">
              Copyright 2020 <a href="#">XPort Digital Limited</a> All Rights
              Reserved
            </p>
          </div>
        </div>
      </footer>

      <div id="cookieNotify" className="hidden">
        <div className="alert bg--c-darkgray--b">
          <button className="close" data-dismiss="alert">
            &times;
          </button>

          <div className="container">
            <button
              data-dismiss="alert"
              className="btn btn-sm btn-primary float--right"
            >
              GOT IT!
            </button>
            <p>
              This website collects cookies to ensure we offer the best
              experience and performance to our visitors. We do not share
              visitor information with 3rd party entities for solicitation and
              marketing purposes.
            </p>
          </div>
        </div>
      </div>

      <div id="backToTop">
        <a
          href="#"
          className="btn btn-lg btn-default active"
          onClick={scrollToTop}
        >
          <i className="fa fa-chevron-up text-white"></i>
        </a>
      </div>
    </div>
  );
};

export default Index;
