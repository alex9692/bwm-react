import React from "react";
import { Link } from "react-router-dom";

import { rentalType } from "../../../helpers";

const RentalCard = props => {
	return (
		<div className="col-md-3 col-xs-6">
			<Link to={`/rentals/${props.id}`} className="rental-detail-link">
				<div className="card bwm-card">
					<img className="card-img-top" src={props.image} alt={props.title} />
					<div className="card-block">
						<h6 className={`card-subtitle ${props.category}`}>
							{rentalType(props.shared)} {props.category} &#183; {props.city}
						</h6>
						<h4 className="card-title">{props.title}</h4>
						<p className="card-text">
							${props.dailyRate} per Night &#183; Free Cancelation
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default RentalCard;
