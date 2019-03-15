const express = require("express");
const router = express.Router();

const Rental = require("../models/rental");
const UserCtrl = require("../controllers/user");

router.get("/secret", UserCtrl.authMiddleware, (req, res, next) => {
	res.json({ secret: true });
});

router.get("", (req, res) => {
	Rental.find({})
		.select("-bookings")
		.exec(function(err, foundRentals) {
			return res.json(foundRentals);
		});
});

router.get("/:id", (req, res) => {
	const rentalId = req.params.id;

	Rental.findById(rentalId)
		.populate("user", "username -_id")
		.populate("bookings", "startsAt endsAt -_id")
		.exec(function(err, foundRental) {
			if (err) {
				return res.status(422).send({
					errors: [{ title: "Error!", detail: "Could not find the rental" }]
				});
			}
			return res.json(foundRental);
		});
});

module.exports = router;
