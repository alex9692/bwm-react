import React from "react";

const BwmTextArea = ({
	input,
	label,
	type,
	rows,
	className,
	meta: { touched, error, warning }
}) => (
	<div className="form-group">
		<label>{label}</label>
		<div className="input-group">
			<textarea {...input} type={type} rows={rows} className={className}></textarea>
		</div>
		{touched && (error && <div className="alert-danger">{error}</div>)}
	</div>
);

export default BwmTextArea;
