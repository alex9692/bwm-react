import React from "react";
import { connect } from "react-redux";

import RentalList from "./RentalList";
import * as actions from "../../../actions";
import { toUpperCase } from '../../../helpers';

class RentalSearchListing extends React.Component {
	state = {
		city: ""
	};

	componentWillMount() {
		this.searchRentalByCity();
	}

	componentDidUpdate(prevProps) {
		const currentUrlParam = this.props.match.params.city;
		const prevUrlParam = prevProps.match.params.city;

		if (currentUrlParam !== prevUrlParam) {
			this.searchRentalByCity();
		}
	}

	searchRentalByCity() {
		const city = this.props.match.params.city;
		this.setState({ city: city });
		this.props.dispatch(actions.fetchRentals(city));
	}

	renderTitle() {
		const { city } = this.state;
		const { errors, rentals } = this.props;
		let title = "";
		if (errors.length > 0) {
			title = errors[0].detail;
		}
		if (rentals.length > 0) {
			title = `Your Home in ${toUpperCase(city)} City`;
		}

		return <h1 className="page-title">{title}</h1>;
	}

	render() {
		return (
			<section id="rentalListing">
				{this.renderTitle()}
				<RentalList rentals={this.props.rentals} />
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		rentals: state.rentals.rentals,
		errors: state.rentals.errors
	};
};

export default connect(mapStateToProps)(RentalSearchListing);
