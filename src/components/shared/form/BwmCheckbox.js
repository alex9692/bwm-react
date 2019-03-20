import React from "react";

const BwmInput = ({
	input,
	label,
	type,
	className,
	meta: { touched, error, warning }
}) => (
	<div className="form-group">
		<label>{label} &nbsp;</label>
		<div className="input-group">
			<input {...input} type={type} />
		</div>
		{touched && (error && <div className="alert-danger">{error}</div>)}
	</div>
);

export default BwmInput;
