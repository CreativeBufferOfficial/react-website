<section className="team--section pt--80 pb--80 bg--c-lighterblue">
        <div className="container">
          <div className="section--title pb--50 text-center">
            <h2 className="h1 text-uppercase">Meet Our Team Members</h2>

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
              </div>
            </div>
          </div>
          <OwlCarousel className="team--members owl-carousel" options={options}>
            {/* <div className="team--members owl-carousel" data-owl-margin="30" data-owl-nav="true" data-owl-responsive='{"0": {"items": "1"}, "481": {"items": "2"}, "992": {"items": "3"}}'> */}
            <div className="team--member text-center">
              <div className="img">
                {/* <img src={Member_1} alt={Member_1} className="img-circle" /> */}
              </div>
              <div className="name text-uppercase">
                <h3 className="h4">Aaron Carter</h3>
              </div>
              <div className="role">
                <p>Founder</p>
              </div>
              <div className="social">
                <ul className="nav">
                  {/* <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i class="fa fa-skype"></i></a></li> */}
                </ul>
              </div>
            </div>
            <div className="team--member text-center">
              <div className="img">
                {/* <img src={Member_2} alt={Member_2} className="img-circle" /> */}
              </div>
              <div className="name text-uppercase">
                <h3 className="h4">Paul Belga</h3>
              </div>
              <div className="role">
                <p>Lead Developer</p>
              </div>
              <div className="social">
                <ul className="nav">
                  {/* <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i class="fa fa-skype"></i></a></li> */}
                </ul>
              </div>
            </div>
            <div className="team--member text-center">
              <div className="img">
                <img src={Member_3} alt={Member_3} className="img-circle" />
              </div>
              <div className="name text-uppercase">
                <h3 className="h4">Jack Lopez</h3>
              </div>
              <div className="role">
                <p>Manager</p>
              </div>
              <div className="social">
                <ul className="nav">
                  <li>
                    <a href="#">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-skype"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="team--member text-center">
              <div className="img">
                <img src={Member_4} alt={Member_4} className="img-circle" />
              </div>
              <div className="name text-uppercase">
                <h3 className="h4">Larry Hall</h3>
              </div>
              <div className="role">
                <p>Support</p>
              </div>
              <div className="social">
                <ul className="nav">
                  <li>
                    <a href="#">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-skype"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* </div> */}
          </OwlCarousel>
        </div>
      </section>