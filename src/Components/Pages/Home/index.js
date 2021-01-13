import React, { Fragment, useState, useRef, useEffect } from "react";
import Banner from "../../Layouts/Banner/index";
import OwlCarousel from "react-owl-carousel2";
import CryptoTransferWidget from "./CryptoTransferWidget/CryptoTransferWidget";
import NormalImg1 from "../../../assets/img/features-img/icon-01-normal.png";
import HoverImg1 from "../../../assets/img/features-img/icon-01-hover.png";
import NormalImg2 from "../../../assets/img/features-img/icon-02-normal.png";
import HoverImg2 from "../../../assets/img/features-img/icon-02-hover.png";
import NormalImg3 from "../../../assets/img/features-img/icon-03-normal.png";
import HoverImg3 from "../../../assets/img/features-img/icon-03-hover.png";
import NormalImg4 from "../../../assets/img/features-img/icon-04-normal.png";
import HoverImg4 from "../../../assets/img/features-img/icon-04-hover.png";
import NormalImg5 from "../../../assets/img/features-img/icon-05-normal.png";
import HoverImg5 from "../../../assets/img/features-img/icon-05-hover.png";
import NormalImg6 from "../../../assets/img/features-img/icon-06-normal.png";
import HoverImg6 from "../../../assets/img/features-img/icon-06-hover.png";
import AboutXport from "../../../assets/img/faq-img/faq-02.jpg";
import WeWorkImg1 from "../../../assets/img/client-img/client-brand-01.png";
import WeWorkImg2 from "../../../assets/img/client-img/client-brand-02.png";
import WeWorkImg3 from "../../../assets/img/client-img/client-brand-03.png";
import WeWorkImg4 from "../../../assets/img/client-img/client-brand-04.png";
import WeWorkImg5 from "../../../assets/img/client-img/client-brand-05.png";
import WeWorkImg6 from "../../../assets/img/client-img/client-brand-06.png";
import WeWorkImg7 from "../../../assets/img/client-img/client-brand-07.png";
import WeWorkImg8 from "../../../assets/img/client-img/client-brand-08.png";
import Spinner from "../../Layouts/Spinner";
import Cookies from "../../Layouts/Cookies";
import history from "../../../@history";
import "./styles.css";
import { userParams, useParams } from 'react-router-dom';

const Index = () => {
  const [value, setValue] = useState({
    loading: false,
  });
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView(false, {
    block: "nearest"
  })
  useEffect(() => {

    setTimeout(() => {
      const data = window.location.href;
      if (data.indexOf('uuid') > -1 || data.indexOf('kyc') > -1 || data.indexOf('redirect') > -1) {
        executeScroll();
      }
    }, 150);
  }, [])
  const { loading } = value;

  const onContentLoaded = (e) => {
    setValue({ loading: true });
  };

  const options = {
    items: 4,
    nav: false,
    navText: [
      '<i className="fa fa-angle-left"></i>',
      '<i className="fa fa-angle-right"></i>',
    ],
    rewind: false,
    autoplay: false,
    loop: false,
    dots: false,
    autoplayHoverPause: false,
  };

  //  alert(props.location.requestId)

  // history.push("/");
  const formWidgetRef = useRef(null)
  const scrollToWidget = () => {
    return formWidgetRef.current && window.scrollTo({
      behavior: "smooth",
      top: formWidgetRef.current.offsetTop
    })
  }

  return (
    <Fragment onLoad={onContentLoaded}>
      {!loading && <Spinner />}
      <Banner scrollToWidget={scrollToWidget} />
      <section className="domain-search--section pt--70" id="form-1345" ref={formWidgetRef}>
        <div className="container">
          <div className="section--title pb--30 text-center">
            {/* <h4 style={{marginBottom: "25px"}} className="h1 text-uppercase"><strong>Buy Crypto</strong> Widget</h4> */}

            <div className="row">
              <div className="col-md-10 col-md-offset-1" ref={myRef}>
                <CryptoTransferWidget />
              </div>
            </div>
          </div>

          <div className="domain-search--form">
            <div className="row gutter--0">
              <div className="col-md-6 col-md-offset-3">
                <div className="input-group">
                  <div className="input-group-addon"></div>
                </div>
                <div className="extras">
                  <ul className="nav"></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing--section pt--70 pb--50">
        <div className="container">
          <div className="section--title pb--50 text-center">
            <h2 className="h1 text-uppercase">
              How We <strong>Stack Up</strong> Against Our{" "}
              <strong>Competitors!</strong>{" "}
            </h2>

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                {/* <p>How we stack up against our competitors!</p> */}
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade in active" id="pricingTab01">
              <OwlCarousel
                className="pricing--slider owl-carousel"
                options={options}
              >
                <div className="pricing--item pt--10 active mr--15">
                  <div className="title text-uppercase">
                    <h3 className="h4">
                      <span className="vc--parent">
                        <span className="vc--child">Product Features</span>
                      </span>
                    </h3>
                  </div>
                  <div className="price">
                    <p>
                      <small></small>
                      <small>User Tx/Fees</small>
                    </p>
                  </div>
                  <div className="features home-features">
                    <ul className="nav">
                      <li>Merchant Fees</li>
                      <li>Customizable Widget</li>
                      <li>Deposit Fee</li>
                      <li>Integration Options</li>
                      <li>Integrate Your Liquidity Provider</li>
                      <li>Merchant Dashboard</li>
                    </ul>
                  </div>
                  <div className="action"></div>
                </div>

                <div className="pricing--item pt--10 mr--15">
                  <div className="title text-uppercase">
                    <h3 className="h4">
                      <span className="vc--parent">
                        <span className="vc--child">XPort Digital</span>
                      </span>
                    </h3>
                  </div>
                  <div className="price">
                    <p>
                      <small></small>4.5%<small>/$4.99 Min</small>
                    </p>
                  </div>
                  <div className="features">
                    <ul className="nav">
                      <li>3.5% Merchant</li>
                      <li>Yes</li>
                      <li>No</li>
                      <li>Fully Hosted/API Service/NPM Package</li>
                      <li>Hosted Wallet or Bring Your Own</li>
                      <li>Yes</li>
                    </ul>
                  </div>
                  <div className="action"></div>
                </div>

                <div className="pricing--item pt--10 mr--15">
                  <div className="title text-uppercase">
                    <h3 className="h4">
                      <span className="vc--parent">
                        <span className="vc--child">RAMP</span>
                      </span>
                    </h3>
                  </div>
                  <div className="price">
                    <p>
                      <small></small>Tiered<small></small>
                    </p>
                  </div>
                  <div className="features">
                    <ul className="nav">
                      <li>Tiered Fees</li>
                      <li>No</li>
                      <li>Unknown</li>
                      <li>Fully Hosted/SDK/Embedded</li>
                      <li>Hosted Wallet</li>
                      <li>No</li>
                    </ul>
                  </div>
                  <div className="action"></div>
                </div>

                <div className="pricing--item pt--10 mr--15">
                  <div className="title text-uppercase">
                    <h3 className="h4">
                      <span className="vc--parent">
                        <span className="vc--child">Simplex</span>
                      </span>
                    </h3>
                  </div>
                  <div className="price">
                    <p>
                      <small></small>3.5%<small>/$10.00 Min</small>
                    </p>
                  </div>
                  <div className="features">
                    <ul className="nav">
                      <li>5.0% Merchant</li>
                      <li>No</li>
                      <li>$20K Deposit Fee</li>
                      <li>Fully Hosted</li>
                      <li>Hosted Wallet</li>
                      <li>Yes</li>
                    </ul>
                  </div>
                  <div className="action"></div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
      <section
        className="features--section pt--70 pb--50"
        data-bg-img="img/features-img/ftr-bg-01.jpg"
      >
        <div className="container">
          <div className="section--title pb--50 text-center">
            <h2 className="h1 text-uppercase">
              Check Out Our <strong>Features</strong>{" "}
            </h2>
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                {/* <p>Placeholder</p> */}
              </div>
            </div>
          </div>
          <div className="row AdjustRow" data-scroll-reveal="group">
            <div className="col-md-4 col-xs-6 col-xxs-12 pb--30">
              <div className="feature--item style--1 text-center">
                <div className="img">
                  <img src={NormalImg1} alt={NormalImg1} />
                  <img src={HoverImg1} alt={HoverImg1} />
                </div>
                <div className="title">
                  <h3 className="h4">Merchant Wallet Hosting</h3>
                </div>
                <div className="desc">
                  <p>
                    <strong>
                      XPort allows merchants to bring their own wallet or use
                      our wallets for token distribution.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 col-xxs-12 pb--30">
              <div className="feature--item style--1 text-center">
                <div className="img">
                  <img src={NormalImg2} alt={NormalImg2} />
                  <img src={HoverImg2} alt={HoverImg2} />
                </div>
                <div className="title">
                  <h3 className="h4">Merchant Dashboard</h3>
                </div>
                <div className="desc">
                  <p>
                    <strong>
                      Full service dashboard to view transactions, administer
                      refunds, automated reconciliation and reporting features.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 col-xxs-12 pb--30">
              <div className="feature--item style--1 text-center">
                <div className="img">
                  <img src={NormalImg3} alt={NormalImg3} />
                  <img src={HoverImg3} alt={HoverImg3} />
                </div>
                <div className="title">
                  <h3 className="h4">Quick and Easy Integration</h3>
                </div>
                <div className="desc">
                  <p>
                    <strong>
                      Integrate our widget with 3 easy options from our turnkey
                      solution or work with our team for your own customized
                      solution.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 col-xxs-12 pb--30">
              <div className="feature--item style--1 text-center">
                <div className="img">
                  <img src={NormalImg4} alt={NormalImg4} />
                  <img src={HoverImg4} alt={HoverImg4} />
                </div>
                <div className="title">
                  <h3 className="h4">Instant KYC</h3>
                </div>
                <div className="desc">
                  <p>
                    <strong>
                      XPort uses real time video and AI know your customer
                      application to quickly confirm your identity and allow you
                      to complete your purchase within minutes.{" "}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 col-xxs-12 pb--30">
              <div className="feature--item style--1 text-center">
                <div className="img">
                  <img src={NormalImg5} alt={NormalImg5} />
                  <img src={HoverImg5} alt={HoverImg5} />
                </div>
                <div className="title">
                  <h3 className="h4">Affiliate Network</h3>
                </div>
                <div className="desc">
                  <p>
                    <strong>
                      We offer a robust affiliate program for our users and
                      affiliate networks to benefit from their support of XPort
                      to earn cash back, lower fees, and more.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-6 col-xxs-12 pb--30">
              <div className="feature--item style--1 text-center">
                <div className="img">
                  <img src={NormalImg6} alt={NormalImg6} />
                  <img src={HoverImg6} alt={HoverImg6} />
                </div>

                <div className="title">
                  <h3 className="h4">Secure</h3>
                </div>

                <div className="desc">
                  <p>
                    <strong>
                      XPort partners with acquirers that are PCI DSS compliant
                      to ensure high security standards are being used.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq--section pt--80 pb--20">
        <div className="container">
          <div className="section--title pb--50 text-center">
            <h2 className="h1 text-uppercase">
              Here are some common questions about XPort Digital
            </h2>

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>For full FAQ, please visit our FAQ Page.</p>
              </div>
            </div>
          </div>
          <div className="row row--vc-md">
            <div className="col-md-6 pb--60">
              <div className="faq--img" data-scroll-reveal="left">
                <img src={AboutXport} alt="" className="center-block" />
              </div>
            </div>
            <div className="col-md-6 pb--60">
              <div
                className="faq--items panel-group"
                id="faqItems01"
                data-scroll-reveal="right"
              >
                <div className="faq--item panel">
                  <div className="panel-heading">
                    <h3 className="h4">
                      <a
                        href="#faqItems01_1"
                        data-toggle="collapse"
                        data-parent="#faqItems01"
                      >
                        <i class="fa fa-cloud"></i>
                        <span>
                          How do I process my first transaction and transfer?
                        </span>
                      </a>
                    </h3>
                  </div>
                  <div id="faqItems01_1" className="panel-collapse collapse in">
                    <div className="panel-body">
                      <p>
                        To complete your first transfer we ask you to perform a quick and standard KYC check to confirm your identity. Once you perform your initial KYC check, you will not be asked to verify prior to your future purchases.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="faq--item panel">
                  <div className="panel-heading">
                    <h3 className="h4">
                      <a
                        href="#faqItems01_2"
                        className="collapsed"
                        data-toggle="collapse"
                        data-parent="#faqItems01"
                      >
                        <i class="fa fa-database"></i>
                        <span>
                          How do I become a XPort customer or merchant affiliate?
                        </span>
                      </a>
                    </h3>
                  </div>
                  <div id="faqItems01_2" className="panel-collapse collapse">
                    <div className="panel-body">
                      <p>
                        Signing up as an XPort Digital Affiliate is as simple as 1,2,3.  Visit our sign up page, create your account and setup your personal affiliate ID.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="faq--item panel">
                  <div className="panel-heading">
                    <h3 className="h4">
                      <a
                        href="#faqItems01_3"
                        className="collapsed"
                        data-toggle="collapse"
                        data-parent="#faqItems01"
                      >
                        <i class="fa fa-server"></i>
                        <span>
                          How soon do I recieve my tokens after I make my
                          purchase?
                        </span>
                      </a>
                    </h3>
                  </div>
                  <div id="faqItems01_3" className="panel-collapse collapse">
                    <div className="panel-body">
                      <p>
                        You will recieve you tokens once your KYC is approved and credit card transaction is approved. If your KYC is delayed, your transfer will be completed once your KYC application is verified.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="faq--item panel">
                  <div className="panel-heading">
                    <h3 className="h4">
                      <a
                        href="#faqItems01_4"
                        className="collapsed"
                        data-toggle="collapse"
                        data-parent="#faqItems01"
                      >
                        <i class="fa fa-lock"></i>
                        <span>How do I become an XPort Digital merchant?</span>
                      </a>
                    </h3>
                  </div>
                  <div id="faqItems01_4" className="panel-collapse collapse">
                    <div className="panel-body">
                      <p>
                        To become an XPort Digital Merchant, please complete the Merchant sign up and application with your company's details and meet our KYB compliance requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="call-to-action pt--50 pb--50 bg--c-main">
        <div className="container">
          <div className="cta--content text-center">
            <div className="title">
              <h2 className="h3">
                Join XPort today and provide your users fast and easy access to
                trade on your platform!
              </h2>
            </div>
            <div className="action">
              <a href="/auth/signup" className="btn btn-lg btn-primary">
                Get Started Now<i class="ml--8 fa fa-check-circle"></i>
              </a>
            </div>
            <div className="note text-uppercase"></div>
          </div>
        </div>
      </section>
      <section className="clients--section pt--70 pb--50">
        <div className="container">
          <div className="section--title pb--50 text-center">
            <h2 className="h1 text-uppercase">We Work With</h2>

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>Here are some of our partners that we work with.</p>
              </div>
            </div>
          </div>
          <div className="row" data-scroll-reveal="group">
            <div className="col-md-3 col-xs-6 col-xss-12 pb--30">
              <div className="client--brand">
                <img src={WeWorkImg1} alt={WeWorkImg1} />
              </div>
            </div>
            <div className="col-md-3 col-xs-6 col-xss-12 pb--30">
              <div className="client--brand">
                <img src={WeWorkImg2} alt={WeWorkImg2} />
              </div>
            </div>
            <div className="col-md-3 col-xs-6 col-xss-12 pb--30">
              <div className="client--brand">
                <img src={WeWorkImg3} alt={WeWorkImg3} />
              </div>
            </div>
            <div className="col-md-3 col-xs-6 col-xss-12 pb--30">
              <div className="client--brand">
                <img src={WeWorkImg4} alt={WeWorkImg4} />
              </div>
            </div>
            {/* <div className="col-md-3 col-xs-6 col-xss-12 pb--30">
                            <div className="client--brand">
                                <img src={WeWorkImg5} alt={WeWorkImg5} />
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6 col-xss-12 pb--30">
                            <div className="client--brand">
                                <img src={WeWorkImg6} alt={WeWorkImg6} />
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6 col-xss-12 pb--30">
                            <div className="client--brand">
                                <img src={WeWorkImg7} alt={WeWorkImg7} />
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6 col-xss-12 pb--30">
                            <div className="client--brand">
                                <img src={WeWorkImg8} alt={WeWorkImg8} />
                            </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>

      <Cookies />
    </Fragment>
  );
};

export default Index;
