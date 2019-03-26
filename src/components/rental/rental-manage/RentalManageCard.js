import React from "react";
import { Link } from "react-router-dom";

import { prettifyDate, toUpperCase } from "../../../helpers";

class RentalManageCard extends React.Component {
	state = {
		deleted: false
	};

	showDeleteMenu = () => {
		this.setState({ deleted: true });
	};

	closeDeleteMenu = () => {
		this.setState({ deleted: false });
	};

	confirmDeleteRental = id => {
		this.props.delete(id);
		this.setState({ deleted: false });
	};

	render() {
		const { rental, modal: Modal } = this.props;
		const { deleted } = this.state;
		const deleteClass = deleted ? "toBeDeleted" : "";
		return (
			<div className="col-md-4">
				<div className={`${deleteClass} card text-center`}>
					<div className="card-block">
						<h4 className="card-title">
							{rental.title} - {toUpperCase(rental.city)}
						</h4>
						<Link className="btn btn-bwm" to={`/rentals/${rental._id}`}>
							Go to Rental
						</Link>
						{rental.bookings && rental.bookings.length > 0 && Modal}
					</div>
					<div className="card-footer text-muted">
						Created at {prettifyDate(rental.createdAt)} &nbsp;
						{!deleted && (
							<button onClick={this.showDeleteMenu} className="btn btn-danger">
								Delete
							</button>
						)}
						{deleted && (
							<div className="delete-menu">
								<p>Do you want to confirm?</p>
								<button
									onClick={() => this.confirmDeleteRental(rental._id)}
									className="btn btn-danger"
								>
									Yes
								</button>
								<button
									onClick={this.closeDeleteMenu}
									className="btn btn-success"
								>
									No
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default RentalManageCard;
