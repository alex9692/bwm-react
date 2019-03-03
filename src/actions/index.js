import axios from "axios";

import * as actionTypes from "./types";
import authService from "../services/auth-service";
import axiosService from "../services/axios-service";

const axiosInstance = axiosService.getInstance();

const fetchRentalsSuccess = rentals => {
	return {
		type: actionTypes.FETCH_RENTALS_SUCCESS,
		rentals
	};
};

export const fetchRentals = () => dispatch => {
	axiosInstance
		.get(`/rentals`)
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

export const register = userData => {
	console.log(userData);
	return axios
		.post("/api/v1/users/register", { ...userData })
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err.response.data.errors);
		});
};

const loginSuccess = token => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		token
	};
};

const loginFailure = errors => {
	return {
		type: actionTypes.LOGIN_FAILURE,
		errors
	};
};

export const checkAuthState = () => dispatch => {
	const token = authService.getToken();
	if (authService.isAuthenticated()) {
		dispatch(loginSuccess(token));
	}
};

export const login = userData => dispatch => {
	return axios
		.post("/api/v1/users/auth", { ...userData })
		.then(res => res.data)
		.then(token => {
			authService.saveToken(token);
			dispatch(loginSuccess(token));
		})
		.catch(err => {
			dispatch(loginFailure(err.response.data.errors));
		});
};

export const logout = () => {
	authService.invalidate();

	return {
		type: actionTypes.LOGOUT
	};
};
