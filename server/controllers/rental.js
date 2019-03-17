const Rental = require("../models/rental");
const User = require("../models/user");

const { normalizeErrors } = require("../helpers/mongoose");

exports.createRental = function(req, res, next) {
	const {
		title,
		city,
		street,
		category,
		image,
		bedrooms,
		shared,
		description,
		dailyRate
	} = req.body;

	const user = res.locals.user;

	const rental = new Rental({
		title,
		city,
		street,
		category,
		image,
		bedrooms,
		shared,
		description,
		dailyRate,
		user
	});

	Rental.create(rental, function(err, newRental) {
		if (err) {
			return res.status(422).send({ errors: normalizeErrors(err.errors) });
		}
		User.update(
			{ _id: user.id },
			{ $push: { rentals: newRental } },
			function() {}
		);
		return res.json(newRental);
	});
};

exports.getRentalById = function(req, res) {
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
};

exports.getRentals = function(req, res) {
	const city = req.query.city;
	const query = city ? { city: city.toLowerCase() } : {};

	Rental.find(query)
		.select("-bookings")
		.exec(function(err, filterRentals) {
			if (err) {
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}
			if (city && filterRentals.length === 0) {
				return res.status(422).send({
					errors: [
						{
							title: "No Rentals found!",
							detail: `There are no rentals for city - ${city}`
						}
					]
				});
			}
			return res.json(filterRentals);
		});
};
