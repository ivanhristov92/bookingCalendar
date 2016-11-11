/**
 * Created by qfintern on 11/7/16.
 */

var Booking = require( './../models/Booking.js' );



                                    /** ********/
                                    /* Actions */
                                    /** ********/


/////////////////////////////////////////////////////////////////////////////////////





function createBooking( req, res ){

    checkIfTimeIsFree( req, res, function(){

        var booking = new Booking({ room: room, date: date, start: start, end: end, user: user, company: company, comments: comments });
        console.log( 'booking', booking );
        booking.save( function( err ){
            if( err ) throw err;
            res.send( 'booking should have been saved' );
        });

    })





}
exports.createBooking = createBooking;





function getAllBookings( req, res ){

    var d = req.body.date;
    //var date = '';
    var opts = {};

    if( d ){
        opts.date = d;
        console.log( 'opts', opts )

        console.log( opts )
        return Booking.find( opts, function( err, bookings ){
            if(err) throw err;
            console.log( 'bookings', bookings )
            res.send( JSON.stringify( bookings ) );
        });

        return;
    }


    Booking.find( function( err, bookings ){
        if(err) throw err;
        res.send( JSON.stringify( bookings ) );
    });
}

exports.getAllBookings = getAllBookings;



function getBooking( req, res ){
    //Code here...
}
exports.getBooking = getBooking;



function editBooking( req, res ){
    //Code here...
}
exports.editBooking = editBooking;



function deleteBooking( req, res ){
    //Code here...
}
exports.deleteBooking = deleteBooking;






/////////////////////////////////////////////////////////////////////////////////////



                                    /** *********/
                                    /* Helpers */
                                    /** ********/





function checkIfTimeIsFree( req, res, callback ){

    var room = req.body.room,
        date = req.body.date,
        start = req.body.startTime,
        end = req.body.endTime,
        user = req.body.user,
        company = req.body.company,
        comments = req.body.comments;

    console.log( 'date___', req.body );


    var errors = {
        busy: 'The time you want to book interferes with an existing booking!'
    }


    //find all bookings for the day
    //find those for this room
    //look for a booking which starts after the startTime and before the endTime of the booking currently being saved
    //loog for a booking which ends between the start and end times of the booking currently being saved

    Booking.find({date: date}, function( err, existingBookings ) {
        if (err) throw err;

        var length = existingBookings.length,

            curStartTime = start,
            split3 = curStartTime.split(":"),
            curStartHour = parseInt(split3[0]),
            curStartMins = parseInt(split3[1]),
            curEndTime = end,
            split4 = curEndTime.split(":"),
            curEndHour = parseInt(split4[0]),
            curEndMins = parseInt(split4[1]),

            passesCheck = {
                passes: true,
                errorMsg: ''
            };

        //check if there the desired times for the booking interfere with existing bookings
        var curDuration = ( (curEndHour - curStartHour)*60 ) + ( curEndMins - curStartMins );
        var curStartInMinutesFromMidnight = (curStartHour*60) + curStartMins;
        var curDurationAddedToStartFromMidnight = curDuration + curStartInMinutesFromMidnight;

        for ( var i = 0; i < length; i++ ) {
            var exBooking = existingBookings[i];
            if (exBooking.room == room) {
                var exStartTime = exBooking.start,
                    split1 = exStartTime.split(":"),
                    exStartHour = parseInt(split1[0]),
                    exStartMins = parseInt(split1[1]),
                    exEndTime = exBooking.end,
                    split2 = exEndTime.split(":"),
                    exEndHour = parseInt(split2[0]),
                    exEndMins = parseInt(split2[1]);



                console.log( exStartHour, exStartMins, ' - ', exEndHour, exEndMins );

                var exDuration = ( (exEndHour - exStartHour)*60 ) + ( exEndMins - exStartMins );
                var exStartInMinutesFromMidnight = (exStartHour*60) + exStartMins;
                var exDurationAddedToStartFromMidnight = exDuration + exStartInMinutesFromMidnight;



                if( curStartInMinutesFromMidnight < exStartInMinutesFromMidnight ){
                    console.log( 'starts before exStart');
                }
                if( curStartInMinutesFromMidnight > exStartInMinutesFromMidnight ){
                    console.log( 'starts after exStart');
                }
                if( curStartInMinutesFromMidnight === exStartInMinutesFromMidnight ){
                    console.log( 'starts at the same time as exStart');
                }



                if( curStartInMinutesFromMidnight < exDurationAddedToStartFromMidnight ){
                    console.log( 'starts before exEnd');
                }
                if( curStartInMinutesFromMidnight > exDurationAddedToStartFromMidnight ){
                    console.log( 'starts after exEnd');
                }
                if( curStartInMinutesFromMidnight === exDurationAddedToStartFromMidnight ){
                    console.log( 'starts at same time as exEnd');
                }



                if( curDurationAddedToStartFromMidnight > exDurationAddedToStartFromMidnight ){
                   console.log( 'ends after exEnd' );
                }
                if( curDurationAddedToStartFromMidnight < exDurationAddedToStartFromMidnight ){
                    console.log( 'ends before exEnd' );
                }
                if( curDurationAddedToStartFromMidnight === exDurationAddedToStartFromMidnight ){
                    console.log( 'ends at the same time exEnd' );
                }



                if( curDurationAddedToStartFromMidnight > exStartInMinutesFromMidnight ){
                    console.log( 'ends after exStart' );
                }
                if( curDurationAddedToStartFromMidnight < exStartInMinutesFromMidnight ){
                    console.log( 'ends before exStart' );
                }
                if( curDurationAddedToStartFromMidnight === exStartInMinutesFromMidnight ){
                    console.log( 'ends at the same time as exStart' );
                }



            }
        } // - end of bookings interference check


        if (!passesCheck.passes) {
            res.send(passesCheck.errorMsg);
            return;
        }


        return;

        callback();

    });

}