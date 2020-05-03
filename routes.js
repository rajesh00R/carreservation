let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'SUCCESS',
        message: 'Welcome To Car Reservation'
    });
});


var carController = require('./carController');

router.route('/car').get(carController.index)
router.route('/addCar').post(carController.add);
router.route('/car/:vehicle_no').get(carController.view)
router.route('/update/:vehicle_no').put(carController.update)
router.route('/delete/:vehicle_no').delete(carController.delete);

router.route('/bookCar').post(carController.reserve);
router.route('/available').get(carController.available);

module.exports = router;