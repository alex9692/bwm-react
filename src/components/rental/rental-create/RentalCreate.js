import React from "react";
import { Redirect } from "react-router-dom";

import RentalCreateForm from "./RentalCreateForm";
import { createRental } from "../../../actions";

class RentalCreate extends React.Component {
	state = {
		errors: [],
		redirect: false
	};
	rentalCategories = ["Apartment", "House", "Condo"];

	onSubmit = rentalData => {
		createRental(rentalData)
			.then(result => {
				this.setState({ redirect: true });
			})
			.catch(err => {
				this.setState({ errors: err });
			});
	};

	render() {
		const { errors, redirect } = this.state;

		if (redirect) {
			return (
				<Redirect
					to={{
						pathname: "/rentals",
						state: { successCreationRental: true }
					}}
				/>
			);
		}
		return (
			<section id="newRental">
				<div className="bwm-form">
					<div className="row">
						<div className="col-md-5">
							<h1 className="page-title">Create Rental</h1>
							<RentalCreateForm
								submitCb={this.onSubmit}
								options={this.rentalCategories}
								errors={errors}
							/>
						</div>
						<div className="col-md-6 ml-auto">
							<div className="image-container">
								<h2 className="catchphrase">
									Hundreds of awesome places in reach of few clicks.
								</h2>
								<img
									src={process.env.PUBLIC_URL + "/img/create-rental.jpg"}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default RentalCreate;
