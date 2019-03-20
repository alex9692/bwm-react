import React from "react";
import { Field, reduxForm } from "redux-form";

import BwmInput from "../../shared/form/BwmInput";
import BwmTextArea from "../../shared/form/BwmTextArea";
import BwmSelect from "../../shared/form/BwmSelect";
import BwmFileUpload from "../../shared/form/BwmFileUpload";
import BwmCheckbox from "../../shared/form/BwmCheckbox";
import BwmResError from "../../shared/form/BwmResError";
import { required } from "../../shared/form/validator";

const RentalCreateForm = props => {
	const {
		handleSubmit,
		pristine,
		submitting,
		valid,
		submitCb,
		options,
		errors
	} = props;

	return (
		<form onSubmit={handleSubmit(submitCb)}>
			<Field
				name="title"
				type="text"
				label="Title"
				className="form-control"
				component={BwmInput}
			/>
			<Field
				name="description"
				type="textarea"
				label="Description"
				rows="6"
				className="form-control"
				component={BwmTextArea}
			/>
			<Field
				name="city"
				type="text"
				label="City"
				className="form-control"
				component={BwmInput}
			/>
			<Field
				name="street"
				type="text"
				label="Street"
				className="form-control"
				component={BwmInput}
			/>
			<Field
				name="category"
				label="Category"
				options={options}
				className="form-control"
				component={BwmSelect}
			/>
			<Field name="image" label="Image" component={BwmFileUpload} />
			<Field
				name="bedrooms"
				type="number"
				label="Bedrooms"
				className="form-control"
				component={BwmInput}
			/>
			<Field
				name="dailyRate"
				type="text"
				label="Daily Rate"
				symbol="$"
				className="form-control"
				component={BwmInput}
			/>
			<Field
				name="shared"
				type="checkbox"
				label="Shared"
				className="form-control"
				component={BwmCheckbox}
			/>
			<button
				className="btn btn-bwm btn-form"
				type="submit"
				disabled={!valid || pristine || submitting}
			>
				Create Rental
			</button>
			<BwmResError errors={errors} />
		</form>
	);
};

export default reduxForm({
	form: "rentalcreateform",
	initialValues: { shared: false, category: "apartment" }
})(RentalCreateForm);
