
var User = require( './../models/User.js' );





                                /** ********/
                                /* Actions */
                                /** ********/


/////////////////////////////////////////////////////////////////////////////////////





/** *******/
/* Login */
/** *******/

function login( req, res ){

    var username = req.body.username,
        password = req.body.password;

    User.findOne({ 'username': username }, function ( err, person ) {
        if ( err ) throw err;
        if( !person ){
            res.send( 'Wrong credentials!' );
        } else {
            if( person.password === password ){

                createSession( req, res, { name: 'bookingSession' }, person._id );
               return;
            }
            res.send( 'Wrong credentials!!' );
        }
    })
}
exports.login = login;






/////////////////////////////////////////////////////////////////////////////////////






/** *******/
/* Logout */
/** *******/

function logout( req, res ){
    clearSession( req, res, { name: 'bookingSession' } );
}
exports.logout = logout;






/////////////////////////////////////////////////////////////////////////////////////




/** ************/
/* Create User */
/** ************/


function createUser( req, res ){

    var username = req.username,
        password = req.password,
        company = req.company,
        picture = req.picture,
        user = new User({ username: username, password: password, company: company });

    console.log( 'user', user )

    user.save( function( err  ){
        if( err ) throw err;
        res.send( 'should be saved' );
    });
}
exports.createUser = createUser;






/////////////////////////////////////////////////////////////////////////////////////





/** **********/
/* Get Users */
/** **********/


function getUsers( req, res ){
    console.log( 'Cookies!!!___', req.cookies )
    User.find( function( err, users ){
        if(err) throw err;
        res.send( JSON.stringify( users ) );
    });
}
exports.getUsers = getUsers;







/////////////////////////////////////////////////////////////////////////////////////






/** **********/
/* Edit User */
/** **********/


function editUser( req, res ){
    let id = req.cookies.bookingUser,
        username = req.body.username,
        email = req.body.email,
        password = req.body.newPassword;

    console.log( req.body )
    User.update( { _id: id }, {
        username: username,
        email: email,
        password: password
    }, function( err, numberAffected, rawResponse ) {
        //handle it
        if( err ) throw err;
        console.log( numberAffected );
        res.send( 'user should now have been updated!' );
    })
}
exports.editUser = editUser;







/////////////////////////////////////////////////////////////////////////////////////



                                /** *********/
                                /* Helpers */
                                /** ********/







/** ***************/
/* Create Session */
/** ***************/

function createSession( req, res, options, currentUserId ){
    var cookieName = options.name;
    if ( req.cookies ) {
        if( !req.cookies.cookieName ){
            var randomNumber=Math.random().toString();
            randomNumber=randomNumber.substring(2,randomNumber.length);
            res.cookie('bookingUser', currentUserId, { maxAge: 900000, httpOnly: true });
            res.cookie('bookingSession',randomNumber, { maxAge: 900000, httpOnly: true });
            res.send( 'cookie created' );
        } else {
            return res.send( 'You are signed in already!' );
        }
    } else {
        var randomNumber=Math.random().toString();
        randomNumber=randomNumber.substring(2,randomNumber.length);
        res.cookie( 'bookingSession',randomNumber, { maxAge: 900000, httpOnly: true } );
        res.send( 'cookie created' )
    }
}



/** **************/
/* Clear Session */
/** **************/

function clearSession( req, res, options  ){

    if( req.cookies && req.cookies[options.name] ){
        res.clearCookie( options.name );
        res.send( 'Logged Out!' );
    } else {
        res.send( 'No cookies found' );
    }

}












