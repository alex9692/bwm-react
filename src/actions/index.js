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

const fetchRentalsInit = () => {
	return {
		type: actionTypes.FETCH_RENTAL_INIT
	};
};

const fetchRentalsFail = errors => {
	return {
		type: actionTypes.FETCH_RENTAL_FAIL,
		errors
	};
};

export const fetchRentals = city => dispatch => {
	dispatch(fetchRentalsInit());
	const url = city ? `/rentals?city=${city}` : "/rentals";
	axiosInstance
		.get(url)
		.then(response => response.data)
		.then(rentals => dispatch(fetchRentalsSuccess(rentals)))
		.catch(({ response }) => dispatch(fetchRentalsFail(response.data.errors)));
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
	const username = authService.getUsername();
	return {
		type: actionTypes.LOGIN_SUCCESS,
		token,
		username
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

export const createBooking = booking => {
	return axiosInstance
		.post("/bookings", booking)
		.then(res => res.data)
		.catch(err => Promise.reject(err.response.data.errors));
};

export const createRental = rentalData => {
	return axiosInstance
		.post("/rentals/new", { ...rentalData })
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err.response.data.errors);
		});
};

const fetchUserBookingsInit = () => {
	return {
		type: actionTypes.FETCH_USER_BOOKINGS_INIT
	};
};

const fetchUserBookingsSuccess = bookings => {
	return {
		type: actionTypes.FETCH_USER_BOOKINGS_SUCCESS,
		bookings
	};
};

const fetchUserBookingsFailure = errors => {
	return {
		type: actionTypes.FETCH_USER_BOOKING_FAILURE,
		errors
	};
};

export const fetchUserBookings = id => dispatch => {
	dispatch(fetchUserBookingsInit());

	axiosInstance
		.get("/bookings/manage")
		.then(res => res.data)
		.then(bookings => dispatch(fetchUserBookingsSuccess(bookings)))
		.catch(err => dispatch(fetchUserBookingsFailure(err.response.data.errors)));
};

export const getUserRentals = () => {
	return axiosInstance
		.get("/rentals/manage")
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err.response.data.errors);
		});
};

export const deleteRental = id => {
	return axiosInstance
		.delete(`/rentals/${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return Promise.reject(err.response.data.errors);
		});
};

const updateRentalSuccess = updatedRental => {
	return {
		type: actionTypes.UPDATE_RENTAL_SUCCESS,
		updatedRental
	};
};

const updateRentalFailure = errors => {
	return {
		type: actionTypes.UPDATE_RENTAL_FAILURE,
		errors
	};
};

export const updateRental = (rentalData, id) => dispatch => {
	return axiosInstance
		.patch(`/rentals/${id}`, { ...rentalData })
		.then(res => {
			return res.data;
		})
		.then(rental => {
			dispatch(updateRentalSuccess(rental));
			if (
				rentalData.city !== rental.city ||
				rentalData.street !== rental.street
			) {
				dispatch(reloadMap());
			}
		})
		.catch(({ response }) => {
			dispatch(updateRentalFailure(response.data.errors));
		});
};

export const resetRentalErrors = () => {
	return {
		type: actionTypes.RESET_RENTAL_ERRORS
	};
};

export const reloadMap = () => {
	return {
		type: actionTypes.RELOAD_MAP
	};
};

export const reloadMapFinish = () => {
	return {
		type: actionTypes.RELOAD_MAP_FINISH
	};
};

export const verifyRentalOwner = id => {
	return axiosInstance.get(`/rentals/${id}/verify-user`);
};
