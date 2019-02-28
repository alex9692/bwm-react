const Rental = require("./models/rental");

class FakeDb {
	constructor() {
		this.rentals = [
			{
				title: "Nice view on ocean",
				city: "San Francisco",
				street: "Main street",
				category: "condo",
				image:
					"https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
				shared: true,
				description: "Very nice apartment in center of the city.",
				dailyRate: 43,
				bedrooms: 4
			},
			{
				title: "Modern apartment in center",
				city: "New York",
				street: "Time Square",
				category: "apartment",
				image:
					"https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
				shared: false,
				description: "Very nice apartment in center of the city.",
				dailyRate: 11,
				bedrooms: 1
			},
			{
				title: "Old house in nature",
				city: "Spisska Nova Ves",
				street: "Banicka 1",
				category: "house",
				image:
					"https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
				shared: true,
				description: "Very nice apartment in center of the city.",
				dailyRate: 23,
				bedrooms: 5
			}
		];
	}

	async cleanDb() {
		await Rental.remove({});
	}

	pushRentalToDb() {
		this.rentals.forEach(rental => {
			const newRental = new Rental(rental);

			newRental.save();
		});
	}

	seeDb() {
		this.cleanDb();
		this.pushRentalToDb();
	}
}

module.exports = FakeDb;
