var mongoose = require('mongoose');

var Car = mongoose.Schema({
    vehicle_no: {
        type: String,
        unique: true,
        required: true
    },
    model_name: {
        type: String,
        required: true
    },
    seating_capacity: {
        type: Number,
        required: true
    },
    rent_per_day: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('car', Car);