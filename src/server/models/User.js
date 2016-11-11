/**
 * Created by qfintern on 11/7/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    company: { type: String, required: true }
})

// set up a mongoose model and pass it using module.exports
var User = mongoose.model( 'User', schema );


module.exports = User;
