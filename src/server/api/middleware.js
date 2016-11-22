/**
 * Created by qfintern on 11/7/16.
 */

var User = require( './../models/User.js' );

function requireAuth( req, res, next ) {

    if( !req.cookies ){
        return res.redirect('/login');
    }
    if ( !req.cookies.bookingSession ) {
        return res.redirect('/login');
    } else {
        next();
    }
}

exports.requireAuth = requireAuth;







/** **********/
/* Is Super User */
/** **********/

function isSuperUser( req, res, next ){

    User.find({ _id: req.cookies.bookingUser }, function( err, users ){

        var currentUser = users[0];
        var isSuperUser = currentUser.toObject().superUser;

        console.log( 'currentUser', currentUser );
        console.log( 'isSuperUser', isSuperUser );

        if( !isSuperUser ){
            console.log( 'not a super user' );
            return res.redirect( '/bookARoom' )
        } else {
            return next();
        }
    });

}
exports.isSuperUser = isSuperUser;


/////////////////////////////////////////////////////////////////////////////////////