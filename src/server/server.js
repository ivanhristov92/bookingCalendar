
//Express-Mongoose Server



/** Variables */

var express = require('express')
var app = express();
var mongoose = require( 'mongoose' );
var userActions = require( './api/users.js' );
var bookingActions = require( './api/bookings.js' );
var middleware = require( './api/middleware.js' );






/** Pre-functions/ App configuration */

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const cookieParser = require( 'cookie-parser' );
app.use( cookieParser());
app.use(allowCrossDomain);






/** Back-end API  */

//USERS
app.post('/api/login', function( req, res ){
    userActions.login( req, res );
});
app.all('/api/logout', function( req, res ){
    userActions.logout( req, res );
});
app.post('/api/createUser', middleware.requireAuth , function( req, res ){
    userActions.createUser( req.body,res );
});
app.get('/api/users', middleware.requireAuth, function( req, res ){
    userActions.getUsers( req,res );
});
app.post('/api/users/edit', middleware.requireAuth, function( req, res ){
    userActions.editUser( req,res );
});




//BOOKINGS
app.post('/api/bookings/create', function( req, res ){
    bookingActions.createBooking( req,res );
});
app.post('/api/bookings/delete', function( req, res ){
    bookingActions.deleteBooking( req,res );
});
app.post('/api/bookings', function( req, res ){
    bookingActions.getAllBookings( req,res );
});




/** Front-end API */

app.get('/', middleware.requireAuth, function(req, res){
    res.redirect( '/bookARoom' );
});
app.get('/login', function(req, res){
    res.sendFile( 'index.html', {root: './../client/'});
});
app.get('/forgotPassword', function(req, res){
    res.sendFile( 'index.html', {root: './../client/'});
});
app.get('/bookARoom', middleware.requireAuth, function(req, res){
    res.sendFile( 'index.html', {root: './../client/'});
});
app.get('/myProfile', middleware.requireAuth, function(req, res){
    res.sendFile( 'index.html', {root: './../client/'});
});
app.get('/src/client/build/bundle.js', function(req, res){
    res.sendFile( 'bundle.js', {root: './../client/build/'});
});
app.get('/src/client/images/:image', function(req, res){
    res.sendFile( req.params.image, {root: './../client/images/'});
});








/** Connection */


connect()
    .on('error', function(err){ throw err; })
    .on('disconnected', connect)
    .once('open', listen);
//--------------------------------------------------------------------------------
function listen () {
    //if (app.get('env') === 'test') return;
    //var port = process.env.PORT || 3210;

    app.listen( 4000, function( err ){
        if(err) throw err;
        console.log('Express app started on port ' + 4000);
    });
}
function connect () {
    //var options = { server: { socketOptions: { keepAlive: 1 } } };
    //var connection = mongoose.connect( 'mongodb://localhost.localdomain:27017/roomBooking' ).connection;
    var connection = mongoose.connect( 'mongodb://localhost:27017/roomBooking' ).connection;
    return connection;
}
//--------------------------------------------------------------------------------