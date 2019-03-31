import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import * as moment from "moment";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import BookingModal from "./BookingModal";
import { getRangeOflDates } from "../../helpers";
import { createBooking } from "../../actions";

class Booking extends React.Component {
	constructor() {
		super();
		this.dateRef = React.createRef();
		this.state = {
			proposedBooking: {
				startsAt: "",
				endsAt: "",
				guests: "",
				days: 0,
				totalPrice: 0
			},
			modal: {
				open: false
			},
			errors: []
		};
		this.bookedOutDates = [];
	}

	componentWillMount() {
		this.getBookedOutDates();
	}

	getBookedOutDates() {
		const { bookings } = this.props.rental;
		if (bookings && bookings.length > 0) {
			bookings.forEach(booking => {
				const dateRange = getRangeOflDates(
					booking.startsAt,
					booking.endsAt,
					"Y/MM/DD"
				);
				this.bookedOutDates.push(...dateRange);
			});
		}
	}

	addNewBookedOutDates(booking) {
		const dateRange = getRangeOflDates(
			booking.startsAt,
			booking.endsAt,
			"Y/MM/DD"
		);
		this.bookedOutDates.push(...dateRange);
	}

	resetData() {
		this.dateRef.current.value = "";

		this.setState({
			proposedBooking: {
				guests: ""
			}
		});
	}

	checkedInvalidDate(date) {
		return (
			this.bookedOutDates.includes(date.format("Y/MM/DD")) ||
			date.diff(moment(), "days") < 0
		);
	}

	handleApply = (event, picker) => {
		const startsAt = picker.startDate.format("Y/MM/DD");
		const endsAt = picker.endDate.format("Y/MM/DD");

		this.dateRef.current.value = startsAt + " to " + endsAt;

		this.setState({
			proposedBooking: {
				...this.state.proposedBooking,
				startsAt,
				endsAt
			}
		});
	};

	selectGuests = event => {
		this.setState({
			proposedBooking: {
				...this.state.proposedBooking,
				guests: +event.target.value
			}
		});
	};

	closeModal = () => {
		this.setState({
			modal: {
				open: false
			}
		});
	};

	confirmBooking = () => {
		const { startsAt, endsAt } = this.state.proposedBooking;
		const days = getRangeOflDates(startsAt, endsAt, "Y/MM/DD").length - 1;
		const { rental } = this.props;
		this.setState({
			proposedBooking: {
				...this.state.proposedBooking,
				days: days,
				totalPrice: days * rental.dailyRate,
				rental: rental
			},
			modal: {
				open: true
			}
		});
	};

	reserveRental = () => {
		createBooking(this.state.proposedBooking).then(
			booking => {
				this.addNewBookedOutDates(booking);
				this.closeModal();
				this.resetData();
				toast.success("Booking successfull!!");
			},
			errors => {
				this.setState({ errors });
			}
		);
	};

	render() {
		const { rental, isAuth } = this.props;
		const { startsAt, endsAt, guests } = this.state.proposedBooking;

		return (
			<div className="booking">
				<h3 className="booking-price">
					${rental.dailyRate}
					<span className="booking-per-night"> per night</span>
				</h3>
				<hr />
				{isAuth ? (
					<React.Fragment>
						<div className="form-group">
							<label htmlFor="dates">Dates</label>
							<DateRangePicker
								onApply={this.handleApply}
								isInvalidDate={date => this.checkedInvalidDate(date)}
								opens="left"
								containerStyles={{ display: "block" }}
							>
								<input
									ref={this.dateRef}
									id="dates"
									type="text"
									className="form-control"
								/>
							</DateRangePicker>
						</div>
						<div className="form-group">
							<label htmlFor="guests">Guests</label>
							<input
								value={guests}
								onChange={this.selectGuests}
								type="number"
								className="form-control"
								id="guests"
								aria-describedby="guests"
								placeholder=""
							/>
						</div>
						<button
							disabled={!startsAt || !endsAt || !guests}
							onClick={this.confirmBooking}
							className="btn btn-bwm btn-confirm btn-block"
						>
							Reserve place now
						</button>
					</React.Fragment>
				) : (
					<Link className="btn btn-bwm btn-confirm btn-block" to="/login">
						Login to Book Rental
					</Link>
				)}
				<hr />
				<p className="booking-note-title">
					People are interested into this house
				</p>
				<p className="booking-note-text">
					More than 500 people checked this rental in last month.
				</p>
				<BookingModal
					open={this.state.modal.open}
					close={this.closeModal}
					booking={this.state.proposedBooking}
					confirm={this.reserveRental}
					errors={this.state.errors}
					dailyRate={rental.dailyRate}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth
	};
};

export default connect(mapStateToProps)(Booking);
