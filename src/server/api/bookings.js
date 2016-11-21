/**
 * Created by qfintern on 11/7/16.
 */

var Booking = require( './../models/Booking.js' );



                                    /** ********/
                                    /* Actions */
                                    /** ********/


/////////////////////////////////////////////////////////////////////////////////////





function createBooking( req, res ){

    checkIfTimeIsFree( req, res, function( room, date, start, end, user, company, comments ){

        var allInfo = checkIfAllInfoIsProvided( req, res, [room, date, start, end, company ] );

        if(!allInfo){ return res.send( 'Some parameter is missing. Please provide all relevant information!' ) }

        var booking = new Booking({ room: room, date: date, start: start, end: end, user: user, company: company, comments: comments });
        console.log( 'booking', booking );
        booking.save( function( err ){
            if( err ) throw err;
            var response = {
                message: 'booking should have been saved',
                object: booking
            }
            res.send( JSON.stringify( response ) );
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






function deleteBooking( req, res ){



    console.log( 'req.body from deleteBooking', req.body );
    console.log( 'req.body._id', req.body._id );

    Booking.remove({ _id: req.body._id }, function( err, booking ) {
        if ( err ){ throw err };

        res.send( "The booking you selected should have been deleted" );

    });



}
exports.deleteBooking = deleteBooking;





function getBooking( req, res ){
    //Code here...
}
exports.getBooking = getBooking;



function editBooking( req, res ){
    //Code here...
}
exports.editBooking = editBooking;










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
        busy: 'The time you want to book interferes with an existing booking!',
        outsideTimeFrame: 'The time you want to book starts outside the allowed booking timeframe!'
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

        var startsBeforeExStart,
            startsAfterExStart,
            startsAtTheSameTimeAsExStart,

            startsBeforeExEnd,
            startsAfterExEnd,
            startsAtTheSameTimeAsExEnd,

            endsBeforeExStart,
            endsAfterExStart,
            endsAtTheSameTimeAsExStart,

            endsBeforeExEnd,
            endsAfterExEnd,
            endsAtTheSameTimeAsExEnd,

            startsBeforeTen;



        for ( var i = 0; i < length; i++ ) {
            var exBooking = existingBookings[i];
            if (exBooking.room == room) {


                    startsBeforeExStart = false;
                    startsAfterExStart = false;
                    startsAtTheSameTimeAsExStart = false;

                    startsBeforeExEnd = false;
                    startsAfterExEnd = false;
                    startsAtTheSameTimeAsExEnd = false;

                    endsBeforeExStart = false;
                    endsAfterExStart = false;
                    endsAtTheSameTimeAsExStart = false;

                    endsBeforeExEnd = false;
                    endsAfterExEnd = false;
                    endsAtTheSameTimeAsExEnd = false;

                    startsBeforeTen = false;




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
                    startsBeforeExStart = true;
                }
                if( curStartInMinutesFromMidnight > exStartInMinutesFromMidnight ){
                    console.log( 'starts after exStart');
                    startsAfterExStart = true;
                }
                if( curStartInMinutesFromMidnight === exStartInMinutesFromMidnight ){
                    console.log( 'starts at the same time as exStart');
                    startsAtTheSameTimeAsExStart = true;
                }



                if( curStartInMinutesFromMidnight < exDurationAddedToStartFromMidnight ){
                    console.log( 'starts before exEnd');
                    startsBeforeExEnd = true;
                }
                if( curStartInMinutesFromMidnight > exDurationAddedToStartFromMidnight ){
                    console.log( 'starts after exEnd');
                    startsAfterExEnd = true;
                }
                if( curStartInMinutesFromMidnight === exDurationAddedToStartFromMidnight ){
                    console.log( 'starts at same time as exEnd');
                    startsAtTheSameTimeAsExEnd = true;
                }



                if( curDurationAddedToStartFromMidnight < exStartInMinutesFromMidnight ){
                    console.log( 'ends before exStart' );
                    endsBeforeExStart = true;
                }
                if( curDurationAddedToStartFromMidnight > exStartInMinutesFromMidnight ){
                    console.log( 'ends after exStart' );
                    endsAfterExStart = true;
                }

                if( curDurationAddedToStartFromMidnight === exStartInMinutesFromMidnight ){
                    console.log( 'ends at the same time as exStart' );
                    endsAtTheSameTimeAsExStart = true;
                }



                if( curDurationAddedToStartFromMidnight < exDurationAddedToStartFromMidnight ){
                    console.log( 'ends before exEnd' );
                    endsBeforeExEnd = true;
                }
                if( curDurationAddedToStartFromMidnight > exDurationAddedToStartFromMidnight ){
                   console.log( 'ends after exEnd' );
                    endsAfterExEnd = true;
                }

                if( curDurationAddedToStartFromMidnight === exDurationAddedToStartFromMidnight ){
                    console.log( 'ends at the same time exEnd' );
                    endsAtTheSameTimeAsExEnd = true;
                }


                if( startsAtTheSameTimeAsExStart ){
                    passesCheck.passes = false;
                    passesCheck.errorMsg = errors.busy;
                }

                if( startsBeforeExStart && endsAfterExStart ){
                    console.log( 'starts before exStart and ends after exStart -- cannot book' )
                    passesCheck.passes = false;
                    passesCheck.errorMsg = errors.busy;
                }

                if( startsAfterExStart && startsBeforeExEnd ){
                    console.log( 'starts after exStart and starts before exEnd -- cannot book' );
                    passesCheck.passes = false;
                    passesCheck.errorMsg = errors.busy;
                }



            }
        } // - end of bookings interference check

        if( curStartHour < 10 || curStartHour > 19 ){
            console.log( "starts outside of the allowed time-frame - cannot book!" );
            passesCheck.passes = false;
            passesCheck.errorMsg = errors.outsideTimeFrame;
        }

        if (!passesCheck.passes) {
            res.send(passesCheck.errorMsg);
            return;
        }

        callback( room, date, start, end, user, company, comments );
    });

}





function checkIfAllInfoIsProvided( req, res, args ){

    var args = arguments[2];
    var passes = true;

    for( var arg in args ){
        if( !args[arg] ){
            passes = false;
        }
    }

return passes;

}