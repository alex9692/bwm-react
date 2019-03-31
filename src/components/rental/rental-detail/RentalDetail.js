import React from "react";
import { connect } from "react-redux";

import RentalDetailInfo from "./RentalDetailInfo";
import RentalDetailUpdate from "./RentalDetailUpdate";
import RentalMap from "./RentalMap";
import Booking from "../../booking/Booking";
import * as actions from "../../../actions";
import UserGuard from "../../shared/auth/UserGuard";

class RentalDetail extends React.Component {
	state = {
		isAllowed: false,
		isFetching: true
	};

	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.dispatch(actions.fetchRentals());
		this.props.dispatch(actions.fetchRentalById(id));
	}

	componentDidMount() {
		const { isUpdate } = this.props.location.state || false;
		if (isUpdate) this.verifyRentalOwner();
	}

	verifyRentalOwner = () => {
		this.setState({ isFetching: true });

		const id = this.props.match.params.id;
		return actions
			.verifyRentalOwner(id)
			.then(() => {
				this.setState({ isAllowed: true, isFetching: false });
			})
			.catch(() => {
				this.setState({ isAllowed: false, isFetching: false });
			});
	};

	renderRentalDetail = (selectedRental, errors) => {
		const { isUpdate } = this.props.location.state || false;

		return isUpdate ? (
			<UserGuard
				isFetching={this.state.isFetching}
				isAllowed={this.state.isAllowed}
			>
				<RentalDetailUpdate errors={errors} selectedRental={selectedRental} />
			</UserGuard>
		) : (
			<RentalDetailInfo selectedRental={selectedRental} />
		);
	};

	render() {
		const { selectedRental, errors } = this.props;
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
								{this.renderRentalDetail(selectedRental, errors)}
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
