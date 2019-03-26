import * as type from "../actions/types";

const INITIAL_STATE = {
	bookings: [],
	errors: [],
	isFetching: false
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case type.FETCH_USER_BOOKINGS_INIT:
			return {
				...state,
				bookings: [],
				errors: [],
				isFetching: true
			};
		case type.FETCH_USER_BOOKINGS_SUCCESS:
			return {
				...state,
				bookings: action.bookings,
				errors: [],
				isFetching: false
			};
		case type.FETCH_USER_BOOKING_FAILURE:
			return {
				...state,
				bookings: [],
				errors: action.errors,
				isFetching: false
			};
		default:
			return state;
	}
};

export default reducer;
