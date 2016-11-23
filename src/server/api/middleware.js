/**
 * Created by qfintern on 11/7/16.
 */

var User = require( './../models/User.js' );
var sanitizeHtml = require('sanitize-html');



/** **********/
/* Require Auth */
/** **********/

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




/** **********/
/* Sanitize */
/** **********/

function sanitize(req, res, next) {

    for( var prop in req.body ){
        req.body[prop] = sanitizeHtml( req.body[prop] );
        console.log( req.body[prop] );
    }

    return next();
}
exports.sanitize = sanitize;




/** **********/
/* allowCrossDomain */
/** **********/

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
exports.allowCrossDomain = allowCrossDomain;




/** **********/
/* addCookies */
/** **********/

function addCookies(req, res, next) {

    res.setHeader( "username", req.cookies.bookingUserUsername );
    return next();
}
exports.addCookies = addCookies;
