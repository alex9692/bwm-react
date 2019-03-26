import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import RentalManageCard from "./RentalManageCard";
import RentalManageModal from "./RentalManageModal";
import { getUserRentals, deleteRental } from "../../../actions";

class RentalManage extends React.Component {
	state = {
		userRentals: [],
		errors: [],
		isFetching: false
	};

	componentWillMount() {
		this.setState({ isFetching: true });
		getUserRentals()
			.then(userRentals => {
				this.setState({ userRentals, isFetching: false });
			})
			.catch(errors => {
				this.setState({ errors, isFetching: false });
			});
	}

	deleteRentalById = id => {
		deleteRental(id)
			.then(res => {
				const rentals = [...this.state.userRentals];
				const index = rentals.findIndex(rental => {
					return id === rental._id;
				});
				rentals.splice(index, 1);
				this.setState({ userRentals: rentals });
			})
			.catch(errors => {
				toast.error(errors[0].detail);
			});
	};

	renderRentals = () => {
		return this.state.userRentals.map((rental, index) => {
			return (
				<RentalManageCard
					rental={rental}
					key={index}
					delete={this.deleteRentalById}
					modal={<RentalManageModal bookings={rental.bookings} />}
				/>
			);
		});
	};

	render() {
		return (
			<section id="userRentals">
				<ToastContainer />
				<h1 className="page-title">My Rentals</h1>
				<div className="row">{this.renderRentals()}</div>
				{!this.state.isFetching && this.state.userRentals.length === 0 && (
					<div className="alert alert-warning">
						You dont have any rentals currenty created. If you want advertised
						your property please follow this link.
						<Link
							style={{ marginLeft: "10px" }}
							className="btn btn-bwm"
							to="/rentals/new"
						>
							Register Rental
						</Link>
					</div>
				)}
			</section>
		);
	}
}

export default RentalManage;
