'use strict';

import React from 'react';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import ModalHRSelecttion from './modal-hour-selection.jsx';

import HourLine from './hour-line.jsx';
import BookingRef from './../components/booking-ref.jsx';

class Room extends React.Component{

    constructor( props ){
        super( props );

        this.state={
            showModal: false,
            showBookings: [],
            bookingsByHours: []
        }

        this.openModal = this.openModal.bind( this );
        this.closeModal = this.closeModal.bind( this );
        this.fileterBookingsByHours = this.fileterBookingsByHours.bind( this );
        this.handleBookingClick = this.handleBookingClick.bind( this );
        this.handleBookingSave = this.handleBookingSave.bind( this );
    }

    fileterBookingsByHours( bookingsArray ){

        let hours = {};

        //initialize the hours object used for sorting
        for( let i = 10; i <= 18; i++ ){
            let key = i + "";
            hours[key] = {
                timeFilled: 0,
                percentage : 0,
                bookings: []
            };
        }

        let updateHour = ( booking, hourStartA, minsStartA, hourEndA, minsEndA )=>{

            let minsEnd = minsEndA,
                hourEnd = hourEndA,
                hourStart = hourStartA,
                minsStart = minsStartA,
                currentHour,
                hourDifference = ( parseInt( hourEnd ) - parseInt( hourStart ) );

            for ( let hour = 0; hour <= hourDifference; hour++ ) {
                let minsForCurrentHour = 0;

                if ( hour === 0 ) {
                    minsForCurrentHour = (parseInt(hourDifference)===0) ? (parseInt(minsEnd)-parseInt(minsStart)) : (60-parseInt(minsStart));
                } else if (hour < hourDifference) {
                    minsForCurrentHour = 60;
                } else {
                    minsForCurrentHour = parseInt(minsEnd);
                }
                    currentHour = parseInt( hourStart ) + hour;

                if ( hour < hourDifference ) {
                    console.log( 'hour<difference; pushing:', hourStart )
                    hours[currentHour].bookings.push(booking);
                    hours[currentHour].timeFilled += minsForCurrentHour;
                } else if ( parseInt( minsEnd ) !== 0 ) {
                    console.log('hour !< difference && minsEnd !== 0; pushing:', hourStart)
                    hours[currentHour].bookings.push(booking);
                    hours[currentHour].timeFilled += minsForCurrentHour;
                }
            }
        }


        //spread the bookings across the hours object properties
        $.each( bookingsArray, ( i, booking )=> {
            if (!booking.start) return;

            let start = booking.start,
                split = start.split(':'),
                hourStart = split[0],
                minsStart = split[1],

                split2 = booking.end.split(":"),
                hourEnd = split2[0],
                minsEnd = split2[1];

            if( hourStart.match(/(10|11|12|13|14|15|16|17|18)/) ){
                console.log( 'match for ', hourStart )
                updateHour( booking , hourStart, minsStart, hourEnd, minsEnd );
            }

        });
        //calculate the percentage of time filled for each hour in the hours object
        $.each( hours, ( i, hour )=>{
            let percent = ( hour.timeFilled/60 )*100;
            hour.percentage = percent + '%';
        });
        //console.log( 'HOURS OBJECT', hours );
        return hours;
    }




    openModal(){
        this.setState( {showModal: true} );
    }

    closeModal(){
        this.setState( {showModal: false} );
    }

    handleBookingClick( e ){
        let hour = $( e.currentTarget ).data( 'hour' );
        let state = $.extend( {}, this.state );
        let selectedBookings = this.bookingsByHours[hour.toString()];
        state.showBookings = selectedBookings;
        this.setState( state )
    }

    handleBookingSave( data ){
        console.log( data );
        this.context.bookingServices.createBooking( data )
        .then( ( response )=>{

                console.log( 'response from createBooking service', response );

            });
    }

    componentWillReceiveProps(){
        let state = $.extend( {}, this.state );
        state.showBookings = [];
        this.setState( state );
    }


    render() {

        let bookingsByHours = this.fileterBookingsByHours(this.props.bookings);
        this.bookingsByHours = bookingsByHours;

        let d = this.props.date;
        let date ='';
        //
        if( d !== '' ){
            date += ( d[0] < 10 ) ? ( '0' + d[0] + '/' ) : ( d[0] + '/' );
            date +=  ( d[1] < 10 ) ? ( '0' + d[1] + '/' ) : ( d[1] + '/' );
            date += d[2];
        }

        let id = 0;

        let bookingSpans = {};

        $.each( bookingsByHours, ( key, bookings )=>{

            bookingSpans[key] = bookings.bookings.map( ( book )=>{

                let width = '10',
                    left = '10';

                let split1 = book.end.split(":"),
                    endMins = split1[1],
                    endHour = split1[0],
                    split2 = book.start.split(":"),
                    startMins = split2[1],
                    startHour = split2[0];

                if( startHour === endHour){
                    let mins = parseInt( endMins ) - parseInt( startMins );
                    let perc = (mins/60)*100;
                    width = perc;
                    left = startMins;
                }

                if( (parseInt( endHour ) - parseInt( startHour )) === 1 ){

                    if( parseInt( endMins ) === 0 ){
                        let mins = 60 - parseInt( startMins );
                        console.log( 'startMins', startMins, mins )

                        width = mins;
                        left = startMins;
                    }
                }

                console.log( width, left )

                return (<span key={id++} className="expand duration" style={{ width: width + 'px', position: 'absolute', left: left + 'px' }}></span>);

            });
        });


        console.log( 'bookingSpans', bookingSpans )


        console.log( bookingsByHours['10'].bookings )
        return (
           <div className="col-sm-6 room">
               <div className="row">
                   <div className="col-sm-10">
                       <h3>{ this.props.roomName }</h3>
                   </div>

                   <div className="col-sm-2">
                       <Button
                           bsStyle="primary"
                           bsSize="large"
                           onClick={ this.openModal }
                       >
                           Book
                       </Button>
                   </div>
                    <div className="col-sm-12">

                        { date }

                    </div>
                   <ModalHRSelecttion roomName={ this.props.roomName } container={ this } shouldShow={ this.state.showModal } close={ this.closeModal } date={ d } save={ this.handleBookingSave } ></ModalHRSelecttion>

               </div>

               <div className="row">

                    <div className="col-sm-12 hoursTable">
                        <div className="content col-sm-5">
                            <div className="col">
                                <ul id="skill">
                                    <li>
                                        <div className="hr10">
                                            <span data-hour="10" className="expand duration" style={ { width: '100px', background: 'red' } } onClick={ this.handleBookingClick }>
                                            { bookingSpans["10"] }
                                            </span>
                                        </div>

                                        <div className="hr10-2" >
                                            <span data-hour="11" className="expand duration" style={ { width: '100px', background: 'red' } } onClick={ this.handleBookingClick }>
                                            { bookingSpans["11"] }
                                            </span>
                                        </div>


                                        <div className="hr10-3" >
                                            <span data-hour="12" className="expand duration" style={ { width: '100px', background: 'red' } } onClick={ this.handleBookingClick }>
                                            { bookingSpans["12"] }
                                            </span>
                                        </div>
s                                    </li>


                                    <li>
                                        <div className="hr13" >
                                            <span data-hour="13" className="expand duration" style={ { width: bookingsByHours["13"].percentage } }  onClick={ this.handleBookingClick }></span>
                                        </div>

                                        <div className="hr13-2" >
                                            <span data-hour="14" className="expand duration" style={ { width: bookingsByHours["14"].percentage } }  onClick={ this.handleBookingClick }></span>
                                        </div>

                                        <div className="hr13-3" >
                                            <span data-hour="15" className="expand duration" style={ { width: bookingsByHours["15"].percentage } }  onClick={ this.handleBookingClick }></span>
                                        </div>
                                     </li>


                                    <li>
                                        <div className="hr16" >
                                            <span data-hour="16" className="expand duration" style={ { width: bookingsByHours["16"].percentage } }  onClick={ this.handleBookingClick }></span>
                                        </div>

                                        <div className="hr16-2" >
                                            <span data-hour="17" className="expand duration" style={ { width: bookingsByHours["17"].percentage } }  onClick={ this.handleBookingClick }></span>
                                        </div>

                                        <div className="hr16-3" >
                                            <span data-hour="18" className="expand duration" style={ { width: bookingsByHours["18"].percentage } }  onClick={ this.handleBookingClick }></span>
                                        </div>
                                    </li>

                                </ul>

                            </div>
                        </div>
                        <div className="col-sm-4 col-sm-offset-2">

                            <BookingRef bookings={ this.state.showBookings }/>

                        </div>

                    </div>
               </div>
           </div>
        );
    }

}

Room.contextTypes = {
    bookingServices: React.PropTypes.object
};

export default Room;