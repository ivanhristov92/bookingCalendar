
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

    User.findOne({ "username": username }, function ( err, person ) {
        if ( err ) throw err;

        if( !person ){
            res.send( 'Wrong credentials!' );
        } else {
            if( person.password === password ){

                createSession( req, res, { name: 'bookingSession' }, person._id, person.username );
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
    var id = req.cookies.bookingUser,
        newUsername = req.body.username,
        newEmail = req.body.email,
        password = req.body.oldPassword,
        newPassword = req.body.newPassword;




    //check if there is any change

    if( !newUsername && !newEmail && !newPassword ){
        console.log( 'no user change requested' );
        return res.send( 'no user change requested' );
    }





    User.find( {_id: id}, function( err, user ){
        if(err) throw err;
        if(!user){
            res.send( 'no user found' );
            return console.log('no user found with an id of:', id);
        }

        var user = user[0];
        console.log( user, password )
        var passMatch = user.password === password;


        if( newPassword !== "" && !passMatch ){
            console.log( 'wrong password' );
            return res.send('wrong password');
        }


        console.log( user );

        var updatedPassword,
            updatedUsername,
            updatedEmail,
            updatedCompany;



        updatedPassword = newPassword ? newPassword : user.password;
        updatedUsername = newUsername ? newUsername : user.username;
        updatedEmail = newEmail ? newEmail : user.email;
        updatedCompany = user.company;





        console.log( updatedPassword, updatedUsername, updatedEmail, updatedCompany );
        return res.send("aaa");

        //User.update( { _id: id }, {
        //    username: updatedUsername,
        //    email: updatedEmail,
        //    password: updatedPassword
        //}, function( err, numberAffected, rawResponse ) {
        //    //handle it
        //    if( err ) throw err;
        //    console.log( numberAffected );
        //    res.send( 'user should now have been updated!' );
        //})

    });

}
exports.editUser = editUser;







/////////////////////////////////////////////////////////////////////////////////////



                                /** *********/
                                /* Helpers */
                                /** ********/







/** ***************/
/* Create Session */
/** ***************/

function createSession( req, res, options, currentUserId, currentUserUsername ){
    var cookieName = options.name;
    if ( req.cookies ) {
        if( !req.cookies.cookieName ){
            var randomNumber=Math.random().toString();
            randomNumber=randomNumber.substring(2,randomNumber.length);
            res.cookie('bookingUser', currentUserId, { maxAge: 900000, httpOnly: true });
            res.cookie('bookingUserUsername', currentUserUsername, { maxAge: 900000, httpOnly: true });
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












