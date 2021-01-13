import React from "react";
import OwlCarousel from "react-owl-carousel2";
import "./styles.css";

export default function Index({ scrollToWidget }) {
  const options = {
    items: 1,
    nav: true,
    navText: [
      '<i className="fa fa-angle-left"></i>',
      '<i className="fa fa-angle-right"></i>',
    ],
    rewind: true,
    autoplay: true,
    loop: true,
    dots: true,
    autoplayHoverPause: true,
    margin: false,
  };

  return (
    <section
      className="banner--section"
      style={{ height: "664px", paddingTop: "0px" }}
    >
      <OwlCarousel className="banner--slider owl-carousel" options={options}>
        <div className="banner--item bg--overlay banner-carousel1">
          <div className="vc--parent">
            <div className="vc--child">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div className="banner--content text-center pt--60 pb--80">
                      <div className="title text-uppercase">
                        <h1 className="h1">XPort Digital</h1>
                      </div>
                      <div className="desc">
                        <p>
                          The Only <strong>Pathway</strong> You Need to{" "}
                          <strong>Crypto Gateway</strong> Services
                        </p>
                      </div>
                      <div className="action">
                        <div className="btn btn-lg btn-default" onClick={scrollToWidget}>
                          Buy Stable Tokens<i className=""></i>
                        </div>
                        <a
                          href="api-documentation"
                          className="btn btn-lg btn-primary"
                        >
                          Integrate Our Widget <i className=""></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner--item bg--overlay banner-carousel2">
          <div className="vc--parent">
            <div className="vc--child">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div className="banner--content text-center pt--60 pb--80">
                      <div className="title text-uppercase">
                        <h1 className="h1">Quick Transfers</h1>
                      </div>
                      <div className="desc">{/* <p>#</p> */}</div>
                      <div className="action">
                        <a href="#" className="btn btn-lg btn-default" onClick={scrollToWidget}>
                          Buy Stable Tokens <i className=""></i>
                        </a>
                        <a
                          href="api-documentation"
                          className="btn btn-lg btn-primary"
                        >
                          Integrate Our Widget <i className=""></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner--item bg--overlay banner-carousel3">
          <div className="vc--parent">
            <div className="vc--child">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div className="banner--content text-center pt--60 pb--80">
                      <div className="title text-uppercase">
                        <h1 className="h1">Simplified Integration</h1>
                      </div>

                      <div className="desc">{/* <p>Placeholder</p> */}</div>

                      <div className="action">
                        <a href="#" className="btn btn-lg btn-default" onClick={scrollToWidget}>
                          Buy Stable Tokens <i className=""></i>
                        </a>
                        <a
                          href="api-documentation"
                          className="btn btn-lg btn-primary"
                        >
                          Integrate Our Widget <i className=""></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </section>
  );
}
