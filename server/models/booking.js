const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	endsAt: {
		type: Date,
		required: [true, "Ending date is required"]
	},
	startsAt: {
		type: Date,
		required: [true, "Starting date is required"]
	},
	totalPrice: Number,
	days: Number,
	guests: Number,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	rental: { type: Schema.Types.ObjectId, ref: "Rental" },
	user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Bookings", bookingSchema);
