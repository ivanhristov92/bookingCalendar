'use strict';

import React from 'react';
import UserServices from './../services/user-services.jsx';
import BookingServices from './../services/booking-services.jsx';

class Main extends React.Component{

    constructor( props ){
        super( props );
        //this.base = 'http://bookingcalendar.quikfox-lab.com:4000';
        this.base = 'http://localhost:4000';
        this.userServices = new UserServices( this.base );
        this.bookingServices = new BookingServices( this.base );
    }

    getChildContext(){
        return {
            userServices: this.userServices,
            bookingServices: this.bookingServices
        }
    }

    render() {


        return (
            <div name="background" className="container-fluid">
                { this.props.children }
            </div>

        );
    }

}


Main.childContextTypes = {
    userServices: React.PropTypes.object,
    bookingServices: React.PropTypes.object
};

export default Main;