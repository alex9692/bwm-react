const express = require("express");
const router = express.Router();

const UserCtrl = require("../controllers/user");
const RentalCtrl = require("../controllers/rental");

router.get("/secret", UserCtrl.authMiddleware, (req, res, next) => {
	res.json({ secret: true });
});

router.get("/:id", RentalCtrl.getRentalById);

router.get("", RentalCtrl.getRentals);

router.post("/new", UserCtrl.authMiddleware, RentalCtrl.createRental);

module.exports = router;
