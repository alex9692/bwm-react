import * as type from "../actions/types";

const INITIAL_STATE = {
	rentals: [],
	selectedRental: {}
};

const rentalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case type.FETCH_RENTALS:
			return {
				...state,
				rentals: action.rentals
			};
		case type.FETCH_RENTAL_BY_ID:
			const rental = state.rentals.find(
				rental => rental.id.toString() === action.id
			);
			return {
				...state,
				selectedRental: rental
			};
		case type.FETCH_RENTAL_BY_ID_INIT:
			return {
				...state,
				selectedRental: {}
			};
		default:
			return state;
	}
};

export default rentalReducer;
