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

exports.deleteRentalById = function(req, res) {
	const user = res.locals.user;

	Rental.findById(req.params.id)
		.populate("user", "_id")
		.populate({
			path: "bookings",
			select: "startsAt",
			match: { startsAt: { $gt: new Date() } }
		})
		.exec(function(err, foundRental) {
			if (err) {
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}

			if (user.id.toString() !== foundRental.user.id.toString()) {
				return res.status(422).send({
					errors: [
						{ title: "Invalid User!", detail: "You are not the rental owner!" }
					]
				});
			}
			if (foundRental.bookings.length > 0) {
				return res.status(422).send({
					errors: [
						{
							title: "Found Active Bookings!",
							detail: "Cannot delete rental with active bookings!!"
						}
					]
				});
			}
			foundRental.remove(function(err) {
				if (err) {
					return res.status(422).send({ errors: normalizeErrors(err.errors) });
				}
			});

			return res.json({ status: "deleted" });
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

exports.manageRentals = function(req, res) {
	const user = res.locals.user;

	Rental.where({ user })
		.populate("bookings")
		.exec(function(err, foundRental) {
			if (err) {
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}
			return res.json(foundRental);
		});
};

exports.updateRental = function(req, res, next) {
	const rentalData = req.body;
	const user = res.locals.user;

	Rental.findById(req.params.id)
		.populate("user")
		.exec(function(err, foundRental) {
			if (err) {
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}
			if (foundRental.user._id.toString() !== user._id.toString()) {
				return res.status(422).send({
					errors: [
						{ title: "Invalid User!", detail: "You are not the rental owner!" }
					]
				});
			}

			foundRental.set(rentalData);
			foundRental.save(function(err) {
				if (err) {
					return res.status(422).send({ errors: normalizeErrors(err.errors) });
				}

				return res.status(200).send(foundRental);
			});
		});
};

exports.verifyUser = function(req, res, next) {
	const user = res.locals.user;

	Rental.findById(req.params.id)
		.populate("user")
		.exec(function(err, foundRental) {
			if (err) {
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}

			if (foundRental.user._id.toString() !== user._id.toString()) {
				return res.status(422).send({
					errors: [
						{ title: "Invalid User!", detail: "You are not the rental owner!" }
					]
				});
			}
			return res.json({ status: "verified" });
		});
};
