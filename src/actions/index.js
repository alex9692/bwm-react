import axios from "axios";

import * as actionTypes from "./types";

const fetchRentalsSuccess = rentals => {
	return {
		type: actionTypes.FETCH_RENTALS_SUCCESS,
		rentals
	};
};

export const fetchRentals = () => dispatch => {
	axios
		.get(`/api/v1/rentals`)
		.then(response => response.data)
		.then(rentals => dispatch(fetchRentalsSuccess(rentals)));
};

const fetchRentalByIdSuccess = rental => {
	return {
		type: actionTypes.FETCH_RENTAL_BY_ID,
		rental
	};
};

const fetchRentalByIdInit = () => {
	return {
		type: actionTypes.FETCH_RENTAL_BY_ID_INIT
	};
};

export const fetchRentalById = id => dispatch => {
	dispatch(fetchRentalByIdInit());

	axios
		.get(`/api/v1/rentals/${id}`)
		.then(response => response.data)
		.then(rental => dispatch(fetchRentalByIdSuccess(rental)));
};
