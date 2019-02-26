import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../actions";

class RentalDetail extends React.Component {
	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.dispatch(actions.fetchRentals());
		this.props.dispatch(actions.fetchRentalById(id));
	}

	render() {
		const selectedRental = this.props.selectedRental;
		if (selectedRental.id) {
			return (
				<React.Fragment>
					<div>{selectedRental.title}</div>
					<div>{selectedRental.city}</div>
					<div>{selectedRental.description}</div>
					<div>{selectedRental.dailyRate}.00$</div>
				</React.Fragment>
			);
		}
		return <div>Loading....</div>;
	}
}

const mapStateToProps = state => {
	return {
		selectedRental: state.rentals.selectedRental
	};
};

export default connect(mapStateToProps)(RentalDetail);
