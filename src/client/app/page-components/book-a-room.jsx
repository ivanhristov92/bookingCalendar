'use strict';

import React from 'react';

import Menu from './../components/menu.jsx';
import Tabs from './../components/tabs.jsx';
import Calendar from './../components/calendar.jsx';
import Room from './../components/room.jsx';
import $ from 'jquery';
import { browserHistory } from 'react-router';


class BookARoom extends React.Component{

    constructor( props ){
        super( props );

        this.state={
            show: '1',
            selectedDate: '',
            bookings: [],
            calendarDate : ''
        }

        this.getBookingsForDate = this.getBookingsForDate.bind( this );
        this.filterBookingsByRoom = this.filterBookingsByRoom.bind( this );
        this.handleLogoutUser = this.handleLogoutUser.bind( this );
        this.showRoom = this.showRoom.bind( this );
        this.handleDateChange = this.handleDateChange.bind( this );
        this.refreshRoom = this.refreshRoom.bind( this );
        this.updateRoom = this.updateRoom.bind( this );
    }

    getBookingsForDate( dateArray ){

        return this.context.bookingServices.getBookings( dateArray )
            .then( ( response )=>{
                //console.log( 'resp from booking services', response );
                return response;
            });
    }

    filterBookingsByRoom() {

        //if( this.state.bookings.length === 0 ) return;
        let rooms = {
            room1: [],
            room2: []
        };
        let bookings = this.state.bookings;
        //console.log( 'state from filterBookingsByRoom', bookings[0] );
        $.each( bookings, ( i, booking )=>{

            if( booking.room == "1" ){
                rooms.room1.push( booking );
            } else if( booking.room == "2" ){
                rooms.room2.push( booking );
            }

        });
        return rooms;
    }


    showRoom( roomKey ){
        let state = $.extend({}, this.state);
        state.show = roomKey;
        this.setState( state );
    }

    handleLogoutUser( e ){
        this.context.userServices.logoutUser()
        .then( ( response )=>{
            browserHistory.push( '/login' );
        });
    }

    handleDateChange( date ){

        let d = [date.date(), date.month() + 1, date.year()];

        this.getBookingsForDate( d )

        .then( ( response )=>{
                //console.log( 'response from getBookingsForDate', response );
                let state = $.extend({}, this.state);

                let date = ( d[0] < 10 ) ? ( '0' + d[0] + '-' ) : ( d[0] + '-' ),
                    month = ( d[1] < 10 ) ? ( '0' + d[1] + '-' ) : ( d[1] + '-' ),
                    year = d[2],
                    fullDate = date + month + year;

                state.selectedDate = d;
                state.calendarDate = date;
                state.bookings = JSON.parse( response );
                this.setState( state );
        });
    }

    refreshRoom( deletedBookingId ){
        let state = $.extend({}, this.state);
        state.bookings = this.state.bookings.filter(( book )=>{
            console.log( 'book from filtering', book )
            return book._id !== deletedBookingId;
        });
        this.setState( state );
    }

    updateRoom( bookingResponse ){
        let state = $.extend({},this.state);
        state.bookings.push( bookingResponse );
        this.setState( state );
    }


    render() {

        let bookings = this.filterBookingsByRoom();
        //console.log( 'bookings by room', bookings );

        let date = this.state.selectedDate;
        let id = 0;
        let getRooms = ()=>{
            switch( this.state.show ){

                case '1' || 1:
                    return (<Room roomName="Room 1" date={ date } bookings={ bookings.room1 } refreshRoom={ this.refreshRoom } updateRoom={ this.updateRoom }></Room>);
                break;

                case '2'|| 2:
                    return (<Room roomName="Room 2" date={date} bookings={ bookings.room2 } refreshRoom={ this.refreshRoom } updateRoom={ this.updateRoom }></Room>);
                    break;

                case '3' || 3:
                    return [
                        <Room key="1" roomName="Room 1" date={date} bookings={ bookings.room1 } refreshRoom={ this.refreshRoom } updateRoom={ this.updateRoom }></Room>,
                        <Room key="2" roomName="Room 2" date={date} bookings={ bookings.room2 } refreshRoom={ this.refreshRoom } updateRoom={ this.updateRoom }></Room>];
                    break;


            }
        };

        let rooms = getRooms();
        console.log( 'bookings from state', this.state.bookings );
        return (
            <div name="" className="row bookARoomPage">
                <div className="col-sm-12">
                    <Menu logout={ this.handleLogoutUser }></Menu>
                </div>

                <div className="col-sm-3">
                    <Calendar onSelect={ this.handleDateChange } selectedDate={ this.state.calendarDate } ></Calendar>
                </div>
                <div className="col-sm-9">
                    <Tabs page={ this.state.show } onRoomChange={ this.showRoom }></Tabs>
                    <div className="row">
                        { rooms }
                    </div>
                </div>

            </div>

        );
    }

}

BookARoom.contextTypes={
    userServices: React.PropTypes.object,
    bookingServices: React.PropTypes.object
};
export default BookARoom;