const moment = require("moment");

const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");

const { normalizeErrors } = require("../helpers/mongoose");

exports.createBooking = function(req, res, next) {
	const { startsAt, endsAt, totalPrice, guests, days, rental } = req.body;

	const user = res.locals.user;

	const booking = new Booking({
		startsAt,
		endsAt,
		totalPrice,
		guests,
		days
	});

	Rental.findById(rental._id)
		.populate("bookings")
		.populate("user")
		.exec(function(err, foundRental) {
			if (err) {
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}

			if (foundRental.user.id == user.id) {
				return res.status(422).send({
					errors: [
						{
							title: "Booking Error!",
							detail: "Cannot create booking on rental you own!!."
						}
					]
				});
			}
			if (isValidBooking(booking, foundRental)) {
				booking.user = user;
				booking.rental = foundRental;
				foundRental.bookings.push(booking);

				booking.save(function(err) {
					if (err) {
						return res
							.status(422)
							.send({ errors: normalizeErrors(err.errors) });
					}

					foundRental.save();
					User.update(
						{
							_id: user.id
						},
						{
							$push: {
								bookings: booking
							}
						},
						function() {}
					);
					return res.json({
						startsAt: booking.startsAt,
						endsAt: booking.endsAt
					});
				});
			} else {
				return res.status(422).send({
					errors: [
						{
							title: "Booking Error!",
							detail: "Choosen dates are already taken."
						}
					]
				});
			}
		});
};

function isValidBooking(proposeBooking, rental) {
	let isValid = true;

	if (rental.bookings && rental.bookings.length > 0) {
		isValid = rental.bookings.every(function(booking) {
			const proposedStart = moment(proposeBooking.startsAt);
			const proposedEnd = moment(proposeBooking.endsAt);

			const actualStart = moment(booking.startsAt);
			const actualEnd = moment(booking.endsAt);

			return (
				(proposedStart > actualStart && proposedStart > actualEnd) ||
				(proposedEnd < actualStart && proposedEnd < actualEnd)
			);
		});
	}

	return isValid;
}
