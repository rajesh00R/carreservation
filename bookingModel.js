var mongoose = require('mongoose');

var Booking = mongoose.Schema({
    vehicle_no: {
        type: String,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    issue_date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('booking', Booking);