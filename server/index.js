const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config");
const FakeDb = require("./fake-db");
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
const imageUploadRoutes = require("./routes/image-upload");
const path = require("path");

mongoose.connect(config.DB_URI).then(() => {
	if (process.env.NODE_ENV !== "production") {
		const fakeDb = new FakeDb();
		fakeDb.seeDb();
	}
});

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1", imageUploadRoutes);

if (process.env.NODE_ENV === "production") {
	const appPath = path.join(__dirname, "..", "build");
	app.use(express.static(appPath));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(appPath, "index.html"));
	});
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log("I am running", PORT);
});
