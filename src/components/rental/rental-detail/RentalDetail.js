import React from "react";
import { connect } from "react-redux";

import RentalDetailInfo from "./RentalDetailInfo";
import RentalMap from "./RentalMap";
import Booking from "../../booking/Booking";
import * as actions from "../../../actions";

class RentalDetail extends React.Component {
	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.dispatch(actions.fetchRentals());
		this.props.dispatch(actions.fetchRentalById(id));
	}

	render() {
		const { selectedRental } = this.props;
		if (selectedRental._id) {
			return (
				<section id="rentalDetails">
					<div className="upper-section">
						<div className="row">
							<div className="col-md-6">
								<img src={selectedRental.image} alt="" />
							</div>
							<div className="col-md-6">
								<RentalMap
									location={`${selectedRental.city}, ${selectedRental.street}`}
								/>
							</div>
						</div>
					</div>

					<div className="details-section">
						<div className="row">
							<div className="col-md-8">
								<RentalDetailInfo selectedRental={selectedRental} />
							</div>
							<div className="col-md-4">
								<Booking rental={selectedRental} />
							</div>
						</div>
					</div>
				</section>
			);
		}
		return <div>Loading....</div>;
	}
}

const mapStateToProps = state => {
	return {
		selectedRental: state.rentals.selectedRental,
		errors: state.rentals.errorsSelectedRental
	};
};

export default connect(mapStateToProps)(RentalDetail);
