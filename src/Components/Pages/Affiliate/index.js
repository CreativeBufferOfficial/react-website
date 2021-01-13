import React, { Fragment, useState } from "react";
// import Img_1 from "../../../assets/img/affiliate-img/top.jpg";
import Spinner from "../../Layouts/Spinner";
import "./styles.css";
import counter_bg from "../../../assets/img/affiliate-img/counter-bg.jpg";

const Index = () => {
  const [value, setValue] = useState({
    loading: false,
  });

  const { loading } = value;

  const onContentLoaded = (e) => {
    setValue({ loading: true });
  };
  return (
    <Fragment>
      {!loading && <Spinner />}

      <section className="banner--item page--header--section pt--30 pb--150 bg--overlay">
        <div className="container">
          <div className="page--header-breadcrumb text-uppercase text-center">
            <ol className="breadcrumb"></ol>
          </div>
          <div className="page--header-title text-uppercase text-center"></div>
        </div>
      </section>

      <section className="affiliate--section pt--80 pb--20">
        <div className="container">
          <div className="affiliate--img pb--40">
            {/* <img src={Img_1} alt="" className="center-block" /> */}
          </div>

          <div className="section--title pb--50 text-center">
            <h2 className="h1 text-uppercase">
              How The <strong>XPort Affiliate</strong> Program Works <strong>You!</strong>?
            </h2>

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>
                  We value our customers and merchants and want to reward you
                  for working with XPort Digital, please sign up or login as an
                  affiliate user or affiliate marketing partner and earn rewards
                  and/or cash payouts.
                </p>
              </div>
            </div>
          </div>

          <div className="affiliate--info-items row gutter--60 text-center">
            <div className="affiliate--info-item col-md-4 col-sm-12 pb--80">
              <div className="affiliate--info-item-inner">
                <div className="icon">
                  <i className="fa fa-user-plus"></i>
                </div>

                <div className="title text-uppercase">
                  <h3 className="h4">Register As Affiliate</h3>
                </div>

                <div className="desc">
                  <p>
                    Sign up on our widget after your transaction on through our
                    sign up page.
                  </p>
                </div>
              </div>
            </div>

            <div className="affiliate--info-item col-md-4 col-sm-12 pb--80">
              <div className="affiliate--info-item-inner">
                <div className="icon">
                  <i className="fa fa-group"></i>
                </div>

                <div className="title text-uppercase">
                  <h3 className="h4">Setup Your Affiliate ID</h3>
                </div>

                <div className="desc">
                  <p>
                    Visit our Affiliate Merchant Site and setup your personal
                    Affiliate ID
                  </p>
                </div>
              </div>
            </div>

            <div className="affiliate--info-item col-md-4 col-sm-12 pb--80">
              <div className="affiliate--info-item-inner">
                <div className="icon">
                  <i className="fa fa-money"></i>
                </div>

                <div className="title text-uppercase">
                  <h3 className="h4">Get Paid</h3>
                </div>

                <div className="desc">
                  <p>
                    Setup your USDT wallet address and recieve your earnings!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="counter--section pt--70 pb--40 bg--overlay bg--overlay-90 bg--c-main--b bg--overlay-blue" img src={counter_bg}>

        <div className="container">
          <div className="row AdjustRow">
            <div className="col-md-3 col-xs-6 col-xss-12 pb--30">

              <div className="counter--item style--2">
                <div className="icon">
                  <i className="fa fa-money"></i>
                </div>

                <div className="title text-uppercase">
                  <h2 className="h4">Average Commission</h2>
                </div>

                <div className="count">
                  <h3 className="h1">$<span data-trigger="counterUp">500</span></h3>
                </div>
              </div>

            </div>

            <div className="col-md-3 col-xs-6 col-xss-12 pb--30">

              <div className="counter--item style--2">
                <div className="icon">
                  <i className="fa fa-slideshare"></i>
                </div>

                <div className="title text-uppercase">
                  <h2 className="h4">Total Referrals</h2>
                </div>

                <div className="count">
                  <h3 className="h1"><span data-trigger="counterUp">20500</span></h3>
                </div>
              </div>

            </div>

            <div className="col-md-3 col-xs-6 col-xss-12 pb--30">

              <div className="counter--item style--2">
                <div className="icon">
                  <i className="fa fa-thumbs-o-up"></i>
                </div>

                <div className="title text-uppercase">
                  <h2 className="h4">Registered Affiliates</h2>
                </div>

                <div className="count">
                  <h3 className="h1"><span data-trigger="counterUp">1000</span></h3>
                </div>
              </div>

            </div>

            <div className="col-md-3 col-xs-6 col-xss-12 pb--30">

              <div className="counter--item style--2">
                <div className="icon">
                  <i className="fa fa-coffee"></i>
                </div>

                <div className="title text-uppercase">
                  <h2 className="h4">Total Commission Paid</h2>
                </div>

                <div className="count">
                  <h3 className="h1">$<span data-trigger="counterUp">503,500</span></h3>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="affiliate--section pt--80 pb--50">
        <div className="container">
          <div className="row AdjustRow">
            <div className="col-md-4 col-sm-12 pb--30">
              <div className="affiliate-pricing--item">
                <h2 className="h4">For Every 5 Successful Conversions</h2>
                <h3 className="h3">XPort Digital Will Payout $5.00</h3>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 pb--30">
              <div className="affiliate-pricing--item">
                <h2 className="h4">Refer 50 Successful Conversions</h2>
                <h3 className="h3">XPort One Time Payout $100.00</h3>
              </div>
            </div>

            <div className="col-md-4 col-sm-12 pb--30">
              <div className="affiliate-pricing--item">
                <h2 className="h4">Refer New Marchant</h2>
                <h3 className="h3">Reduce Your Merhant Mainteance Fees</h3>
              </div>
            </div>
          </div>

          <div className="affiliate--btn pt--30 pb--30 text-center">
            <a href="/auth/signup" className="btn btn-lg btn-default">
              Signup
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Index;
