import * as type from "../actions/types";

const INITIAL_STATE = {
	rentals: [],
	selectedRental: {}
};

const rentalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case type.FETCH_RENTALS_SUCCESS:
			return {
				...state,
				rentals: action.rentals
			};
		case type.FETCH_RENTAL_BY_ID:
			return {
				...state,
				selectedRental: action.rental
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
