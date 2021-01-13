import React, { Fragment, Component } from 'react';
import $ from 'jquery';

class Cookies extends Component {
    componentDidMount() {
        var $cookieNotify = $('#cookieNotify'),
            cookieNotifyString = document.cookie,
            cookieNotifyRegex = new RegExp('cookieNotify');

        if ($cookieNotify.length && !cookieNotifyRegex.test(cookieNotifyString)) {
            $cookieNotify.removeClass('hidden');
        }

        $cookieNotify.on('click', '[data-dismiss]', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $cookieNotify.slideUp('slow');
            document.cookie = 'cookieNotify=true';
        });
    }

    render() {
        return <Fragment>
            <div id="cookieNotify" className="hidden">
                <div className="alert bg--c-darkgray--b">
                <button className="close" data-dismiss="alert">&times;</button>

                <div className="container">
                    <button data-dismiss="alert" className="btn btn-sm btn-primary float--right">GOT IT!</button>
                    <p>This website collects cookies to ensure we offer the best experience and performance to our visitors. We do
                    not
                    share visitor information with 3rd party entities for solicitation and marketing purposes.</p>
                </div>
                </div>
            </div>
        </Fragment>
        
    }
}

export default Cookies;