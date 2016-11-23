'use strict';

import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import ModalHRSelecttion from './modal-hour-selection.jsx';

class BookingRef extends React.Component{

    constructor( props ){
        super( props );

        this.filterCompanyName = this.filterCompanyName.bind( this );

    }

    filterCompanyName( compName ){
        let filtered = "";

        for( let i = 0; i < compName.length; i++ ){

            let char;
            if( i === 0 ){
                char = compName[i].toUpperCase();
            } else {
                char = compName[i];

                if( char.match( /[A-Z]/ ) ){
                    char = " " + char;
                }
            }
            filtered += char;
        }
        return filtered;
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
                        <div className="col-sm-2">
                            <img height="100px" src="/src/client/images/avatar.png"/>
                        </div>

                        <div className="col-sm-10">
                            <div className="row">

                                <div className="col-sm-12">
                                    Name: <span className="bookingRefFiledContent">{ booking.user }</span>
                                </div>

                                <div className="col-sm-12">
                                    Company: <span className="bookingRefFiledContent">{ this.filterCompanyName( booking.company ) }</span>
                                </div>

                                <div className="col-sm-12 bookingHoursRow">
                                    { booking.start + " - " + booking.end }
                                </div>

                                <div className="col-sm-10 comments">
                                    Comments: <span className="bookingRefFiledContent">{ booking.comments }</span>
                                </div>

                                <div className="col-sm-12 text-right deleteBtnRow">
                                    <button className="btn btn-default custom" onClick={ this.props.onOpenDeleteModal }>delete</button>
                                </div>

                            </div>
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