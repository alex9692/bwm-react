import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rentalReducer from "./rental-reducer";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth-reducer";
import bookingReducer from "./booking-reducer";

export const init = () => {
	const reducer = combineReducers({
		rentals: rentalReducer,
		form: formReducer,
		auth: authReducer,
		bookings: bookingReducer
	});

	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

	return store;
};
