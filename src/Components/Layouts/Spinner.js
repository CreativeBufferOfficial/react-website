import React, { Fragment, Component } from 'react';
import './styles.css';
import $ from 'jquery';

class Spinner extends Component {
    componentDidMount = () => {
        setTimeout(() => {
            var $bodyPreloader = $('#preloader');

            if ($bodyPreloader.length > 0) {
                setTimeout(() => {
                    $bodyPreloader.fadeOut('slow');
                }, 1000);
            }
        })
    }

    render() {
        return <Fragment>
            <div id="preloader">
                <div className="preloader--spinners">
                    <span className="preloader--spinner"></span>
                    <span className="preloader--spinner"></span>
                </div>
            </div>
        </Fragment>        
    }
}

export default Spinner;
