import React, {Fragment, useState} from 'react';
import './styles.css';
import Bg2 from '../../../assets/img/contact-img/white_bg01_resized.jpg';
import Spinner from '../../Layouts/Spinner';

const Index = () => {
    const [value, setValue] = useState({
        loading: false,
    });

    const { loading } = value;

    const onContentLoaded = (e) => {
        setValue({ loading: true });
    }

    return <Fragment onLoad={onContentLoaded}>
            {!loading && <Spinner/>}
            <section className="banner--item page--header--section pt--30 pb--150 bg--overlay">
        <div className="container">
          <div className="page--header-breadcrumb text-uppercase text-center">
            <ol className="breadcrumb"></ol>
          </div>
          <div className="page--header-title text-uppercase text-center"></div>
        </div>
      </section>

            <section className="contact--section pt--70" style={{ backgroundImage: `url(${Bg2})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="container ">
                    <div className="section--title pb--50 text-center">
                        <h2 className="h1 text-uppercase">Communication Is Everything</h2>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                                <p>Contact our sales team if you have any questions regarding our services, we look forward to hearing from you!</p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row pb--30" data-scroll-reveal="group">
                        <div className="col-xs-4 col-xxs-12 pb--30">
                            <div className="contact--info-item">
                                <div className="icon">
                                    <i className="fa fa-phone"></i>
                                </div>

                                <div className="title">
                                    <h3 className="h3">24/7 Call Us</h3>
                                </div>

                                <div className="info">
                                    <h4 className="h4"><a href="tel:0004561239870" className="btn-link">000 456 123 9870</a></h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-4 col-xxs-12 pb--30">
                            <div className="contact--info-item">
                                <div className="icon">
                                    <i className="fa fa-envelope-open-o"></i>
                                </div>
                                <div className="title">
                                    <h3 className="h3">Email Us</h3>
                                </div>
                                <div className="info">
                                    <h4 className="h4"><a href="mailto:sales@example.com" className="btn-link">sales@example.com</a></h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-4 col-xxs-12 pb--30">
                            <div className="contact--info-item">
                                <div className="icon">
                                    <i className="fa fa-map-marker"></i>
                                </div>
                                <div className="title">
                                    <h3 className="h3">Our Location</h3>
                                </div>
                                <div className="info">
                                    <h4 className="h4">896, Shewrapara, Dhaka.</h4>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="p-5">
                        <div className="contact--form ">
                            <div className="title text-center">
                                <h2 className="h1 text-uppercase">Get in Touch</h2>
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p> */}
                            </div>

                            <form action="forms/contact-form.php" data-form="ajax">
                                <div className="status"></div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="Your Name" className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input type="email" name="email" placeholder="Email Address" className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <input type="text" name="subject" placeholder="Subject" className="form-control" required />
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <textarea name="message" placeholder="Message" className="form-control" required></textarea>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <button type="submit" className="btn btn-lg btn-block btn-default active text-white">Send Your Message<i className="ml--8 fa fa-long-arrow-right"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>

            <section>
                <div id="map" data-trigger="map" data-map-latitude="23.790546" data-map-longitude="90.375583" data-map-zoom="16" data-map-marker="[[23.790546, 90.375583]]"></div>
            </section>
        </Fragment>
    
}
export default Index
