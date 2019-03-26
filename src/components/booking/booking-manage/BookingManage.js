import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../../actions";
import BookingCard from './BookingCard';

class BookingManage extends React.Component {
	componentWillMount() {
		this.props.dispatch(actions.fetchUserBookings());
	}

	renderBookings = () => {
		return this.props.bookings.map((booking, index) => {
			return <BookingCard booking={booking} key={index} />;
		});
	};

	render() {
		return (
			<section id="userBookings">
				<h1 className="page-title">My Bookings</h1>
				<div className="row">{this.renderBookings()}</div>
				{!this.props.isFetching && this.props.bookings.length === 0 && (
					<div className="alert alert-warning">
						You have no bookings created go to rentals section and book your
						place today.
						<Link
							style={{ marginLeft: "10px" }}
							className="btn btn-bwm"
							to="/rentals"
						>
							Available Rental
						</Link>
					</div>
				)}
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		bookings: state.bookings.bookings,
		isFetching: state.bookings.isFetching
	};
};

export default connect(mapStateToProps)(BookingManage);
