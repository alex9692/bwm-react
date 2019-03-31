import * as type from "../actions/types";

const INITIAL_STATE = {
	rentals: [],
	selectedRental: {},
	errors: [],
	errorsSelectedRental: []
};

const rentalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case type.FETCH_RENTAL_INIT:
			return {
				...state,
				rentals: [],
				errors: []
			};
		case type.FETCH_RENTAL_FAIL:
			return {
				...state,
				rentals: [],
				errors: action.errors
			};
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
		case type.UPDATE_RENTAL_SUCCESS:
			return {
				...state,
				selectedRental: action.updatedRental
			};
		case type.UPDATE_RENTAL_FAILURE:
			return {
				...state,
				errorsSelectedRental: action.errors
			};
		case type.RESET_RENTAL_ERRORS:
			return {
				...state,
				errorsSelectedRental: []
			};
		default:
			return state;
	}
};

export default rentalReducer;
