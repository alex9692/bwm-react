const express = require("express");
const router = express.Router();

const UserCtrl = require("../controllers/user");
const RentalCtrl = require("../controllers/rental");

router.get("/secret", UserCtrl.authMiddleware, (req, res, next) => {
	res.json({ secret: true });
});

router.get("/manage", UserCtrl.authMiddleware, RentalCtrl.manageRentals);

router.get("/:id", RentalCtrl.getRentalById);

router.get("/:id/verify-user", UserCtrl.authMiddleware, RentalCtrl.verifyUser);

router.patch("/:id", UserCtrl.authMiddleware, RentalCtrl.updateRental);

router.delete("/:id", UserCtrl.authMiddleware, RentalCtrl.deleteRentalById);

router.get("", RentalCtrl.getRentals);

router.post("/new", UserCtrl.authMiddleware, RentalCtrl.createRental);

module.exports = router;
