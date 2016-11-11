
//Express-Mongoose Server



/** Variables */

var express = require('express')
var app = express();
var mongoose = require( 'mongoose' );
var userActions = require( './api/users.js' );
var bookingActions = require( './api/bookings.js' );
var middleware = require( './api/middleware.js' );







/** Pre-functions */

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const cookieParser = require( 'cookie-parser' );
app.use( cookieParser());







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
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
//--------------------------------------------------------------------------------
function listen () {
    //if (app.get('env') === 'test') return;
    app.listen( 3000 );
    console.log('Express app started on port ' + 3000);
}
function connect () {
    //var options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect( 'mongodb://localhost:27017/roomBooking' ).connection;
}
//--------------------------------------------------------------------------------