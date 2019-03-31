import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import * as actions from "../../../actions";
import { toUpperCase } from '../../../helpers'
import RentalAssets from "./RentalAssets";
import EditableInput from "../../shared/editable/EditableInput";
import EditableTextArea from "../../shared/editable/EditableTextArea";
import EditableSelect from "../../shared/editable/EditableSelect";

class RentalDetailUpdate extends React.Component {
	updateRental = rentalData => {
		const id = this.props.selectedRental._id;
		this.props.dispatch(actions.updateRental(rentalData, id));
	};

	resetRentalErrors = () => {
		this.props.dispatch(actions.resetRentalErrors());
	};

	render() {
		const { selectedRental, errors } = this.props;
		if (errors && errors.length > 0) {
			toast.error(errors[0].detail);
		}
		return (
			<div className="rental">
				<label
					className={`rental-label rental-type ${selectedRental.category}`}
				>
					Shared
				</label>
				<EditableSelect
					entity={selectedRental}
					entityField={"shared"}
					className={`rental-type ${selectedRental.category}`}
					updateEntity={this.updateRental}
					options={[true, false]}
					containerStyle={{ display: "inline-block" }}
					errors={errors}
					resetErrors={this.resetRentalErrors}
				/>
				<EditableSelect
					entity={selectedRental}
					entityField={"category"}
					className={`rental-type ${selectedRental.category}`}
					updateEntity={this.updateRental}
					options={["apartment", "condo", "house"]}
					errors={errors}
					resetErrors={this.resetRentalErrors}
				/>
				<div className="rental-owner">
					<img
						src="https://api.adorable.io/avatars/285/abott@adorable.png"
						alt="owner"
					/>
					<span>{selectedRental.user && selectedRental.user.username}</span>
				</div>
				<EditableInput
					entity={selectedRental}
					entityField={"title"}
					className={"rental-title"}
					updateEntity={this.updateRental}
					errors={errors}
					resetErrors={this.resetRentalErrors}
				/>
				<EditableInput
					entity={selectedRental}
					entityField={"city"}
					className={"rental-city"}
					updateEntity={this.updateRental}
					errors={errors}
					resetErrors={this.resetRentalErrors}
					formatPipe={[toUpperCase]}
				/>
				<EditableInput
					entity={selectedRental}
					entityField={"street"}
					className={"rental-street"}
					updateEntity={this.updateRental}
					errors={errors}
					resetErrors={this.resetRentalErrors}
				/>
				<div className="rental-room-info">
					<span>
						<i className="fa fa-building" />
						<EditableInput
							entity={selectedRental}
							entityField={"bedrooms"}
							className={"rental-bedrooms"}
							containerStyle={{ display: "inline-block" }}
							updateEntity={this.updateRental}
							errors={errors}
							resetErrors={this.resetRentalErrors}
						/>
						bedrooms
					</span>
					<span>
						<i className="fa fa-user" /> {selectedRental.bedrooms + 4} guests
					</span>
					<span>
						<i className="fa fa-bed" /> {selectedRental.bedrooms + 2} beds
					</span>
				</div>
				<p className="rental-description">{selectedRental.description}</p>
				<EditableTextArea
					entity={selectedRental}
					entityField={"description"}
					className={"rental-description"}
					updateEntity={this.updateRental}
					rows={8}
					cols={50}
					errors={errors}
					resetErrors={this.resetRentalErrors}
				/>
				<hr />
				<RentalAssets />
			</div>
		);
	}
}

export default connect()(RentalDetailUpdate);
