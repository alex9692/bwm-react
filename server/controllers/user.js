const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { normalizeErrors } = require("../helpers/mongoose");
const { SECRET } = require("../config/dev");

exports.auth = (req, res) => {
	const { email, password } = req.body;

	if (!password || !email) {
		return res.status(422).send({
			errors: [
				{
					title: "Data missing!",
					detail: "Provide fill in the email and/or password."
				}
			]
		});
	}

	User.findOne({ email }, (err, user) => {
		if (err) {
			return res.status(422).send({ errors: normalizeErrors(err.errors) });
		}

		if (!user) {
			return res.status(422).send({
				errors: [{ title: "Invalid user!", detail: "User doesn't exist." }]
			});
		}

		if (user.matchPassword(password)) {
			const token = jwt.sign(
				{
					userId: user._id,
					username: user.username
				},
				SECRET,
				{ expiresIn: 60 * 60 }
			);
			return res.json(token);
		} else {
			return res.status(422).send({
				errors: [{ title: "Wrong data", detail: "Wrong email or password." }]
			});
		}
	});
};

exports.register = (req, res) => {
	const { username, email, password, passwordConfirmation } = req.body;

	if (!password || !email) {
		return res.status(422).send({
			errors: [
				{
					title: "Data missing!",
					detail: "Provide fill in the email and/or password."
				}
			]
		});
	}
	if (password !== passwordConfirmation) {
		return res.status(422).send({
			errors: [{ title: "Invalid Password", detail: "Passwords do not match" }]
		});
	}

	User.findOne({ email }, (err, existingUser) => {
		if (err) {
			return res.status(422).send({ errors: normalizeErrors(err.errors) });
		}

		if (existingUser) {
			return res.status(422).send({
				errors: [
					{
						title: "Invalid email",
						detail: "User with this email already exists."
					}
				]
			});
		}

		const user = new User({
			username,
			email,
			password
		});

		user.save(err => {
			if (err) {
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}
			return res.json({ registered: true });
		});
	});
};

exports.authMiddleware = function(req, res, next) {
	const token = req.headers.authorization;

	if (token) {
		const user = parseToken(token);

		User.findById(user.userId, function(err, user) {
			if (err) {
				return res.status(422).send({ errors: normalizeErrors(err.errors) });
			}

			if (user) {
				res.locals.user = user;
				next();
			} else {
				return notAuthorized(res);
			}
		});
	} else {
		return notAuthorized(res);
	}
};

function parseToken(token) {
	return jwt.verify(token.split(" ")[1], SECRET);
}

function notAuthorized(res) {
	return res.status(401).send({
		errors: [
			{ title: "Not authorized", detail: "You need to login to get access!" }
		]
	});
}
