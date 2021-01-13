import React, { Fragment, useState } from "react";
import OwlCarousel from "react-owl-carousel2";
import About_img from "../../../assets/img/about-img/about-01.jpg";
import Member_1 from "../../../assets/img/team-img/member-01.jpg";
import Member_2 from "../../../assets/img/team-img/member-02.jpg";
import Member_3 from "../../../assets/img/team-img/member-03.jpg";
import Member_4 from "../../../assets/img/team-img/member-04.jpg";
import Spinner from "../../Layouts/Spinner";
import "./styles.css";

const Index = () => {
  const options = {
    items: 3,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    rewind: true,
    autoplay: true,
    loop: true,
    dots: false,
    autoplayHoverPause: true,
    margin: 30,
  };

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
      <section className="page--content--section pt--80 pb--20">
        <div className="container pt--50">
          <div className="row row--vc-md">
            <div className="col-md-5 col-sm-6 pb--60">
              <div className="page--content-img" id="left">
                <img src={About_img} alt={About_img} />
              </div>
            </div>

            <div className="col-md-7 col-sm-6 pb--60">
              <div className="page--content-inner" id="right">
                <div className="title">
                  <h2 className="h1">Why Work With Us</h2>
                </div>

                <div className="sub-title">
                  <h3 className="h3">XPort's Values</h3>
                </div>

                <div className="desc">
                  <h4>Our Mission</h4>

                  <p>
                    XPort Digital Limited is a crypto transfer gateway that
                    allows our users and merchants to fund their wallets with
                    stable tokens or other digital currencies. Our mission is to
                    deliver fast, safe and secure services that are key to
                    thrive in today’s digital markets.
                  </p>
                </div>

                <div className="desc">
                  <h4>Our Vission</h4>

                  <p>
                    Our vision is to bring smart solutions that are efficient
                    and inclusive to individuals that deserve an opportunity to
                    see their capital work for them.
                  </p>
                </div>

                <div className="desc">
                  <h4>Our Strategy</h4>

                  <p>
                    The principle that drives our strategy is a strong
                    foundation of alliances and partnerships through our
                    affiliate program and merchant network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* <section className="call-to-action pt--50 pb--50 bg--c-main">
                <div className="container">
                    <div className="cta--content text-center">
                        <div className="title">
                            <h2 className="h3">Choose the best Managed Cloud Hosting experience for your business!</h2>
                        </div>

                        <div className="action">
                            <a href="#" className="btn btn-lg btn-primary">Get Started Now<i class="ml--8 fa fa-check-circle"></i></a>
                        </div>

                        <div className="note text-uppercase">
                            <p><small>Vorem ipsum dolor sit amet</small></p>
                        </div>
                    </div>
                </div>
            </section> */}
    </Fragment>
  );
};

export default Index;
