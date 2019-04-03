import React from "react";
import { connect } from "react-redux";

import RentalMap from "./RentalMap";
import RentalAssets from "./RentalAssets";

import EditableInput from "../../shared/editable/EditableInput";
import EditableTextArea from "../../shared/editable/EditableTextArea";
import EditableSelect from "../../shared/editable/EditableSelect";
import EditableImage from "../../shared/editable/EditableImage";

import Booking from "../../booking/Booking";
import * as actions from "../../../actions";
import UserGuard from "../../shared/auth/UserGuard";
import { toUpperCase } from "../../../helpers";

class RentalUpdate extends React.Component {
	state = {
		isAllowed: false,
		isFetching: true
	};

	componentWillMount() {
		const id = this.props.match.params.id;
		this.props.dispatch(actions.fetchRentals());
		this.props.dispatch(actions.fetchRentalById(id));
	}

	componentDidMount() {
		this.verifyRentalOwner();
	}

	updateRental = rentalData => {
		const id = this.props.selectedRental._id;
		this.props.dispatch(actions.updateRental(rentalData, id));
	};

	resetRentalErrors = () => {
		this.props.dispatch(actions.resetRentalErrors());
	};

	verifyRentalOwner = () => {
		this.setState({ isFetching: true });

		const id = this.props.match.params.id;
		return actions
			.verifyRentalOwner(id)
			.then(() => {
				this.setState({ isAllowed: true, isFetching: false });
			})
			.catch(() => {
				this.setState({ isAllowed: false, isFetching: false });
			});
	};

	render() {
		const { selectedRental, errors } = this.props;
		const { isAllowed, isFetching } = this.state;

		if (selectedRental._id) {
			return (
				<UserGuard isFetching={isFetching} isAllowed={isAllowed}>
					<section id="rentalDetails">
						<div className="upper-section">
							<div className="row">
								<div className="col-md-6">
									<EditableImage
										entity={selectedRental}
										entityField={"image"}
										errors={errors}
										updateEntity={this.updateRental}
										resetErrors={this.resetRentalErrors}
									/>
								</div>
								<div className="col-md-6">
									<RentalMap
										location={`${selectedRental.city}, ${
											selectedRental.street
										}`}
									/>
								</div>
							</div>
						</div>

						<div className="details-section">
							<div className="row">
								<div className="col-md-8">
									<div className="rental">
										<label
											className={`rental-label rental-type ${
												selectedRental.category
											}`}
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
											<span>
												{selectedRental.user && selectedRental.user.username}
											</span>
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
												<i className="fa fa-user" />{" "}
												{selectedRental.bedrooms + 4} guests
											</span>
											<span>
												<i className="fa fa-bed" />{" "}
												{selectedRental.bedrooms + 2} beds
											</span>
										</div>
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
								</div>
								<div className="col-md-4">
									<Booking rental={selectedRental} />
								</div>
							</div>
						</div>
					</section>
				</UserGuard>
			);
		}
		return <div>Loading....</div>;
	}
}

const mapStateToProps = state => {
	return {
		selectedRental: state.rentals.selectedRental,
		errors: state.rentals.errorsSelectedRental
	};
};

export default connect(mapStateToProps)(RentalUpdate);
