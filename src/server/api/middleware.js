/**
 * Created by qfintern on 11/7/16.
 */

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