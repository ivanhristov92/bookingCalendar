'use strict';

import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import ModalHRSelecttion from './modal-hour-selection.jsx';

class BookingRef extends React.Component{

    constructor( props ){
        super( props );

    }


    render() {

        let id=0;

        console.log( this.props.bookings, 'from Booking Ref' )

        let bookings = this.props.bookings;

        if( bookings.bookings ){
            bookings = bookings.bookings;
        }

        bookings = bookings.map( ( booking )=>{
            return (

                <div key={id++} className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <img height="100px" src="/src/client/images/avatar.png"/>
                        </div>

                        <div className="col-sm-12">
                            Name: <span>{ booking.username }</span>
                        </div>

                        <div className="col-sm-12">
                            Company: <span>{ booking.company }</span>
                        </div>

                        <div className="col-sm-12">
                            { booking.start + " - " + booking.end }
                        </div>

                        <div className="col-sm-12 comments">
                            Comments: <span>Some comments about this booking</span>
                        </div>

                        <div className="col-sm-12 text-right">
                            <button className="btn btn-default" onClick={ this.props.onOpenDeleteModal }>delete</button>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="row">
                { bookings }
            </div>
        );
    }

}

export default BookingRef;