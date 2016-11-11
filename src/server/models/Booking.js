/**
 * Created by qfintern on 11/7/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Booking', new Schema({

    room: { type: String, required: true },
    date: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    user: String,
    company: { type: String, required: true },
    comments: String

}));