const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");

router.get("", (req, res) => {
	Rental.find({}, (err, foundRentals) => {
		res.json(foundRentals);
	});
});

router.get("/:id", (req, res) => {
	const rentalId = req.params.id;

	Rental.findById(rentalId, (err, foundRental) => {
        if(err) {
            res.status(422).send({errors: [{title: 'Error!', detail: 'Could not find the rental'}]})
        }
		res.json(foundRental);
	});
});

module.exports = router;
