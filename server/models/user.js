const bcrpyt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		min: [4, "Too short, min is 4 characters"],
		max: [32, "Too long, max is 32 characters"],
		required: true
	},
	email: {
		type: String,
		min: [4, "Too short, min is 4 characters"],
		max: [32, "Too long, max is 32 characters"],
		unique: true,
		lowercase: true,
		required: "Email is required",
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
	},
	password: {
		type: String,
		min: [4, "Too short, min is 4 characters"],
		max: [32, "Too long, max is 32 characters"],
		required: "Password is required"
	},
	rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
	bookings: [{ type: Schema.Types.ObjectId, ref: "Bookings" }]
});

// userSchema.pre('save', (next) => {
//     // const user = ;
//     console.log(this);
//     const user = this;
//     bcrpyt.genSalt(10, (err, salt) => {
//         bcrpyt.hash(user.password, salt, (err, hash) => {
//             user.password = hash;
//             next();
//         });
//     });
// });

userSchema.methods.matchPassword = function(requestedPassword) {
	return bcrpyt.compareSync(requestedPassword, this.password);
};

userSchema.pre("save", function(next) {
	// const user = ;
	const user = this;
	bcrpyt.genSalt(10, function(err, salt) {
		bcrpyt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model("User", userSchema);
