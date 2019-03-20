import React from "react";

const BwmResError = props => {
	const errors = props.errors;
	return (
		errors.length > 0 && (
			<div className="alert alert-danger bwm-res-errors">
				{errors.map((error, index) => {
					return <p key={index}>{error.detail}</p>;
				})}
			</div>
		)
	);
};

export default BwmResError;
