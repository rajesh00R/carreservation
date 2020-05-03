Car = require('./carModel');
Booking = require('./bookingModel');


//Showing All Cars in the database
exports.index = function(req, res) {   
    Car.find({},function(err, cars) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        res.json({
            status: "Success",
            message: "Showing All Cars",
            data: cars
        });
    });
};
//Adding new Car to the database
exports.add = function (req, res) {
    var car = new Car();
    car.vehicle_no = req.body.vehicle_no;
    car.model_name = req.body.model_name;
    car.seating_capacity = req.body.seating_capacity;
    car.rent_per_day = req.body.rent_per_day;
    car.save(function (err) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }else{
            res.json({
                message: 'New car Added!',
                data: car
            });
        }
    });
};
//View Car Details
exports.view = function (req, res) {
    Car.findOne({vehicle_no : req.params.vehicle_no }, function (err, car) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }else{
            res.json({
                message: 'Showing Car detail..',
                data: car
            });
        }
    });
};

// Handle update contact info
exports.update = function (req, res) {
Booking.findOne({vehicle_no : req.params.vehicle_no}).count(function(err,cnt){
    if(err){
        res.json({
            status:"Error",
            message: err,
        });
    }else{
        if(cnt > 0){
            res.json({
                message: 'Car Update Failed : There Exist booking for Car',
            });
        }else{
            Car.findOne({vehicle_no : req.params.vehicle_no}, function (err, car) {
                if (err) {
                    res.json({
                        status: "Error",
                        message: err,
                    });
                }
                car.vehicle_no = req.params.vehicle_no;
                car.model_name = req.body.model_name;
                car.seating_capacity = req.body.seating_capacity;
                car.rent_per_day = req.body.rent_per_day;

                car.save(function (err) {
                    if (err) {
                        res.json({
                            status: "Error",
                            message: err,
                        });
                    }
                    res.json({
                        message: 'Car Info updated',
                        data: car
                    });
                });
            });
        }
    }
});
};

// Handle delete contact
exports.delete = function (req, res) {
Booking.findOne({vehicle_no : req.params.vehicle_no}).count(function(err,cnt){
    if(err){
        res.json({
            status:"Error",
            message: err,
        });
    }else{
        if(cnt > 0){
            res.json({
                message: 'Car Update Failed : There Exist booking for Car',
            });
        }else{
            Car.remove({vehicle_no : req.params.vehicle_no}, function (err, car) {
                if(err){
                    res.json({
                        status: "Error",
                        message: err,
                    });
                }
                res.json({
                    status: "success",
                    message: 'Car deleted from database'
                });
            });
            res.json({
                message: 'Success',
            });
        }
    }
});
    
};

// Making Reservation of Car
exports.available = function (req, res) {
    var data= new Array();
    Car.find({seating_capacity : req.body.seating_capacity},function(err, cars) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }else{

            cars.forEach((car) =>{   
                var d1 =new Date(req.body.issue_date);
                var d2 =new Date(req.body.return_date);
                Booking.find({vehicle_no : car.vehicle_no, $or: [ { issue_date: { $elemMatch: { $gt: d1, $lt : d2 } } }, { return_date: { $elemMatch:{ $gt: d1,$lt: d2 } } }]}).count(function(err,cnt){
                    if(err){
                        res.json({
                            status:"Error",
                            message: err,
                        });
                    }else{
                        if(cnt == 0){
                            data.push(car);
                        }
                    }
                });

            })
            
            res.json({
                status:"Success",
                data : data
            });

        }
    });
   
};

exports.reserve = function (req, res) {
    
    var booking = new Booking();
    booking.vehicle_no = req.body.vehicle_no;
    booking.customer_name = req.body.customer_name;
    booking.phone_no = req.body.phone_no;
    booking.issue_date = req.body.issue_date;
    booking.return_date =req.body.return_date;
    booking.save(function (err) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        res.json({
            status: "Success",
            message: 'Your Car is Booked',
            data: booking
        });
    });
};