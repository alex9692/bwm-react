import React from "react";

import RentalAssets from "./RentalAssets";
import { toUpperCase, rentalType } from "../../../helpers";

const RentalDetailInfo = props => {
	const selectedRental = props.selectedRental;
	return (
		<div className="rental">
			<h2 className={`rental-type ${selectedRental.category}`}>
				{rentalType(selectedRental.shared)} {selectedRental.category}
			</h2>
			<h1 className="rental-title">{selectedRental.title}</h1>
			<h2 className="rental-city">{toUpperCase(selectedRental.city)}</h2>
			<div className="rental-room-info">
				<span>
					<i className="fa fa-building" />
					{selectedRental.bedrooms} bedrooms
				</span>
				<span>
					<i className="fa fa-user" /> {selectedRental.bedrooms + 4} guests
				</span>
				<span>
					<i className="fa fa-bed" /> {selectedRental.bedrooms + 2} beds
				</span>
			</div>
			<p className="rental-description">{selectedRental.description}</p>
			<hr />
			<RentalAssets />
		</div>
	);
};

export default RentalDetailInfo;
