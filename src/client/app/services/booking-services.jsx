'use strict';

import $ from 'jquery';

const BookingServices = ( baseUrl ) =>{

    let base = baseUrl;



    let getBookings = ( dateArray )=>{
        let date = ( dateArray[0] < 10 ) ? ( '0' + dateArray[0] + '-' ) : ( dateArray[0] + '-' ),
            month = ( dateArray[1] < 10 ) ? ( '0' + dateArray[1] + '-' ) : ( dateArray[1] + '-' ),
            year = dateArray[2];

        let fullDate = date + month + year;
        console.log( fullDate );

        return new Promise( ( resolve, reject )=>{
            $.ajax({

                method: 'POST',
                url: base + '/api/bookings',
                contentType: 'application/json',
                data: JSON.stringify( { date: fullDate }),
                success: ( response, textStatus, jqXHR  )=>{
                    var username = jqXHR.getResponseHeader('username');
                    var resp = {
                        response: response,
                        username: username
                    }
                    resolve( resp );
                }
            });
        });
    }


    let createBooking = ( booking )=>{
        return new Promise( ( resolve, reject )=>{
            $.ajax({

                method: 'POST',
                url: base + '/api/bookings/create',
                contentType: 'application/json',
                data: JSON.stringify( booking ),
                success: ( response )=>{
                    resolve( response );
                }
            });
        });
    };

    let deleteBooking = ( booking )=>{
        return new Promise( ( resolve, reject )=>{
            $.ajax({

                method: 'POST',
                url: base + '/api/bookings/delete',
                contentType: 'application/json',
                data: JSON.stringify( booking ),
                success: ( response )=>{
                    resolve( response );
                }
            });
        });
    };




    return {
        getBookings: getBookings,
        createBooking: createBooking,
        deleteBooking: deleteBooking
    }

}

export default BookingServices;