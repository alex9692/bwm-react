import React from "react";

import RentalCard from "./RentalCard";

class RentalList extends React.Component {
	renderRental() {
		return this.props.rentals.map((rental, index) => (
			<RentalCard
				key={index}
				id={rental._id}
				title={rental.title}
				city={rental.city}
				shared={rental.shared}
				dailyRate={rental.dailyRate}
				category={rental.category}
				image={rental.image}
				bedrooms={rental.bedrooms}
			/>
		));
	}

	render() {
		return <div className="row">{this.renderRental()}</div>;
	}
}

export default RentalList;
